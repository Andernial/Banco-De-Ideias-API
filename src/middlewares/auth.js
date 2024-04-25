import jwt from 'jsonwebtoken'
import { BlackListedToken } from '../entities/BlackList.entity.js'

export const SECRET = "placeholderSecret"


export const verifyJwt = (rolePermission) => {
    return async (req, res, next ) =>{
        const token = req.headers['x-acess-token']
        const verifyPromise = (jwt.verify)
        await BlackListedToken.sync()
        
        try{
            const decoded = verifyPromise(token, SECRET)
            const inBlackList = await BlackListedToken.findByPk(token)
    
            if(inBlackList){
                return res.status(401).json({message: 'token invalido!'}).end()
            }
    
           if(decoded.role !== rolePermission){
            return res.status(401).json({message: 'permissão não suficiente!'}).end()
           }
    
            req.role = decoded.role
            req.userid = decoded.userid
            next();
        }catch(error){
            console.log(error)
            res.status(401).end()
        }
    }
}