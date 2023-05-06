import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import db from '../models';

const activationKey = process.env.ACTIVATION_KEY || 'secret';
const accountDefinitionsdefinitions = [
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
    /**
     * Activates new account
     * @param {Object} data 
     * @returns Object
     */
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
            

            const {dataValues:{firstName, lastName, email}} = await db.User.create({
                ...user,
                password: await bcrypt.hash(user.password, 10),
                accountId: accounts[0].id
            })

            
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


    async login(userData){
        const { email, password: plainPassword } = userData;
        try {
            let user = await db.User.findOne({
                where: {email}
            });
            if(!user){
                return {token: '', error: 'invalide credentials'}
            }
            const {dataValues:{password, firstName, lastName, email:useEmail}} = user

            let compare  = await bcrypt.compare(plainPassword, password);
            let token;
            if(compare){
                token = {token: await jsonwebtoken.sign({ firstName, lastName, useEmail}, process.env.SECRET_KEY, { expiresIn: '7d' })}
            }else{
                
                token = {token: '', error: 'invalide credentials'}
            }
            return token
        } catch (error) {
            throw error
        }
    }

    async getUser(id){
        try {
            const user = await db.User.findAll({ 
                include: { all: true, nested: true }, 
                where: {id},
                attributes: {exclude: ['password']},
            });
            return user
        } catch (error) {
            throw error
        }
    }

    async createAccount(name, description) {
        try {
            let res = [];
            const {id:accountId} = await db.Accounts.create({
                name, description
            });
            const accessDef = await db.AccessDefinitions.findAll();
            accessDef.forEach(({id:definitionId}) => {
                res.push({accountId, definitionId, status: false})
            })
            await db.AccessControl.bulkCreate(res)
            return {name, description}
        } catch (error) {
            throw error
        }
    }

    async getAccounts(){
        try {
            const accounts = await db.Accounts.findAll({ 
                include: { all: true, nested: true }, 
            });
            return accounts
        } catch (error) {
            throw error
        }
    }

    async updateAccessControl({status, accountType, accountDefinitions}){
        try {
            const access = await db.AccessControl.update({
                status,
            }, {where: {
                definitionId: accountDefinitions,
                accountId: accountType

            }});
            return access
        } catch (error) {
            throw error
        }
    }
    
    async createUser(data){
        try {
            const user = await db.User.create(data);
            return user
        } catch (error) {
            throw error
        }
    }
}

export default Aim;