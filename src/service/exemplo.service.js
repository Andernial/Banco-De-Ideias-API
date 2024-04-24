import { ExemploEntity } from "../entities/Exemplo.entity.js";


export class ExemploService{
    async ExemploServiçoFazAlgo(name){
        try {
            await ExemploEntity.sync()
            
            const newExemplo = await ExemploEntity.create({name})
            return newExemplo
        } catch (error) {
            throw error
        }
    }

    async TrazItensDeExemploService(offset,limit){
        try {
            await ExemploEntity.sync()
            
            const items = await ExemploEntity.findAll({
                offset: offset,
                limit: limit,
                order: [['id', 'DESC']]   
            
            })

            return items

        } catch (error) {
            throw error
        }
    }

    async ContaTodosItemsExemploService(){
        try {
            await ExemploEntity.sync()

            const numberOfItems = await ExemploEntity.count()

            return numberOfItems
        } catch (error) {
            throw error
        }
    }
}