import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import db from '../models';

const activationKey = process.env.ACTIVATION_KEY || 'secret';
const definitions = [
    {
        name: 'create account',
        group: 'aim',
        description: 'users can create an account'
    },
    {
        name: 'add user',
        group: 'aim',
        description: 'users can add other users'
    },
    {
        name: 'access control',
        group: 'aim',
        description: 'users change account access control'
    },
    {
        name: 'create machine/auto mobiles',
        group: 'machine/auto mobiles',
        description: 'users can create equipment'
    },
    {
        name: 'create parts',
        group: 'machine/auto mobiles',
        description: 'users can create parts for auto mobiles'
    },
    {
        name: 'service request',
        group: 'services',
        description: 'users can request services for products '
    },
]

class Aim {
    async activateFleetAccount(data){
        try {
            const {activationKey:key, user} = data
        let res = [];
        if(activationKey === key){
            const accountDefinitions = await db.AccessDefinitions.bulkCreate(definitions)
            const accounts = await db.Accounts.bulkCreate([
                {
                    name: 'super user',
                    description: 'Initial user with super user previlages'
                },
                {
                    name: 'default',
                    description: 'Default use with not previlages'
                }
            ]);

            accounts.forEach(account => {
                const {id:accountId, name} = account;
                accountDefinitions.forEach(def => {
                    const {id: definitionId, } = def;
                    const status = name === 'super user'? true : false;
                    res.push({name, accountId, definitionId, status})
                })
            });
            const access = await db.AccessControl.bulkCreate(res);
            

            const {dataValues:superUser} = await db.User.create({
                ...user,
                password: await bcrypt.hash(user.password, 10),
                accountId: accounts[0].id
            })

            const {firstName, lastName, email} = user;
            let token = await jsonwebtoken.sign({ firstName, lastName, email}, process.env.SECRET_KEY, { expiresIn: '7d' });

            res = { token}
        }
        else{
            res  = []
        }
        return res
        } catch (error) {
            throw error
        }
    }
}

export default Aim;