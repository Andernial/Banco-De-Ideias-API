import { ValidationError } from "sequelize";

export const errorHandling = (err,req,res,next) =>{

    console.log(err)

    if (err instanceof ValidationError) {
        // Erro de validação do Sequelize
        return res.status(400).json({ error: err.errors.map(err => ({message: err.message, path:err.path})) });
    }

        if(err.name == "SequelizeUniqueConstraintError"){
           
           return res.status(400).json({error: err.errors.map(err => ({message: err.message, path: err.path})) })
        }

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({error: err.errors.map(err => ({message: err.message, path: err.path})) });
        }


         res.status(500).json({message: 'Erro inesperado', error: err.name})

        
}