import { ExemploService } from "../service/exemplo.service.js";


const instanceOfExemploService = new ExemploService()


const FazAlgoDeExemplo = async (req, res) => {

    try {
        const { name } = req.body
        const result = await instanceOfExemploService.ExemploServiçoFazAlgo(name)

        res.status(200).json({ result })
    } catch (error) {
        res.status(400).json({ message: `generic error: ${error}` })
    }

}

const RetornaItemsDeExemplo = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);
        
        if (!limit) {
            limit = 5;
        }
        
        if (!offset) {
            offset = 0;
        }
        
        console.log(limit, offset);
        
        const result = await instanceOfExemploService.TrazItensDeExemploService(offset, limit);
        const total = await instanceOfExemploService.ContaTodosItemsExemploService();
        console.log(total);
        const currentUrl = `${req.baseUrl}${req.path}`;
        
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
        
        res.status(200).json({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            items: result
        });

    } catch (error) {
        res.status(400).json(error)
    }
}

export { FazAlgoDeExemplo, RetornaItemsDeExemplo }