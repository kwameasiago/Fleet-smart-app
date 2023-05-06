import bcrypt from 'bcrypt';
import db from '../models';
import jsonwebtoken from 'jsonwebtoken';

class Authentication {
    async register(userData) {
        const { firstName, lastName, email, password } = userData;
        try {
            let res = await db.User.create({
                firstName, lastName, email,
                password: await bcrypt.hash(password, 10)
            });
            let jwt
            jwt = await jsonwebtoken.sign({ firstName, lastName, email}, process.env.SECRET_KEY, { expiresIn: '7d' });

            return {jwt}
        } catch (error) {    
            return {jwt: ''}
        }
    }

    async login(userData){
        const { email, password: plainPassword } = userData;
        try {
            let user = await db.User.findOne({
                where: {email}
            });
            if(!user){
                return {jwt: ''}
            }
            const {dataValues:{password, firstName, lastName, email:useEmail}} = user

            let compare  = await bcrypt.compare(plainPassword, password);
            let jwt;
            if(compare){
                jwt = await jsonwebtoken.sign({ firstName, lastName, useEmail}, process.env.SECRET_KEY, { expiresIn: '7d' });
            }else{
                
                jwt = {jwt: ''}
            }
            return jwt
        } catch (error) {
            return {jwt: ''}
        }
    }

    async userInfo(token){
        
        try {
            console.log(token);
            let decoded = jsonwebtoken.verify(token['auth-token'], process.env.SECRET_KEY);

            // let user = await db.User.findOne({
            //     where: {email}
            // });
            
            return decoded
            
        } catch (error) {
            
            return {
                name: "JsonWebTokenError",
                message: "invalid signature",
                error
            }
        }
    }
}

export default Authentication;