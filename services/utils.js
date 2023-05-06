import jsonwebtoken from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    const {headers} = req;
    try {
        if(headers['authorization-token']){
            const decode = await jsonwebtoken.verify(headers['authorization-token'], process.env.SECRET_KEY);
            console.log({decode})
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