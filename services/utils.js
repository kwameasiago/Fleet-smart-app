import jsonwebtoken from 'jsonwebtoken';
import db from '../models';

export const isAuthenticated = async (req, res, next) => {
    const {headers} = req;
    try {
        if(headers['authorization-token']){
            await jsonwebtoken.verify(headers['authorization-token'], process.env.SECRET_KEY);
            next();
        }else{
            res.status(401).send({
                error: 'Unauthorized'
            })
        }
    } catch (error) {
        res.status(401).send({
            error: 'Unauthorized'
        })
    }
    

}

export const accessControl  = (name) => async (req, res, next) => {
    const {headers} = req;
    try {
        const {email} = await jsonwebtoken.verify(headers['authorization-token'], process.env.SECRET_KEY);
        const {dataValues:{accountId}} = await db.User.findOne({
            where:{email}
        });
        const {dataValues: {id:definitionId}} = await db.AccessDefinitions.findOne({
            where: {name}
        })

        const {dataValues: {status}} = await db.AccessControl.findOne({
            where: {accountId, definitionId}
        })
        if(status){
            next()
        }else{
            res.status(401).send({
                error: 'Unauthorized'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: 'Unauthorized'
        })
    }
}