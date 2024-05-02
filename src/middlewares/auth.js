import jwt from 'jsonwebtoken'
import { BlackListedToken } from '../entities/BlackList.entity.js'
import { UserEntity } from '../entities/User.entity.js'
import dotenv from 'dotenv'

dotenv.config()

export const SECRET = process.env.JWT_SECRET


export const verifyJwt = (rolePermission) => {
    return async (req, res, next ) =>{
        const token = req.headers['x-acess-token']
        const verifyPromise = (jwt.verify)
        await BlackListedToken.sync()
        
        try{
            const decoded = verifyPromise(token, SECRET)
            const inBlackList = await BlackListedToken.findByPk(token)
            const userExists = await UserEntity.findByPk(decoded.userid)
            console.log(userExists)
    
            if(inBlackList){
                return res.status(401).json({message: 'token invalido!'}).end()
            }

            if(!userExists && rolePermission === 'user'){
                return res.status(401).json({message: 'token não existe mais!'}).end()
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