import { ValidationError } from "sequelize";

export const errorHandling = (err,req,res,next) =>{

    console.log(req)

    if (err instanceof ValidationError) {
        // Erro de validação do Sequelize
        return res.status(400).json({ error: err.errors.map(err => err.message) });
    }

        if(err.name == "SequelizeUniqueConstraintError"){
           
           return res.status(400).json({error: err.errors.map(err => err.message) })
        }

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({error: err.errors.map(err => err.message) });
        }


         res.status(500).json({message: 'Erro inesperado', error: err.name})

        
}