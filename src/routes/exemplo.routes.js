import  Express from "express";
import { FazAlgoDeExemplo, RetornaItemsDeExemplo } from "../controller/exemplo.controller.js";
const ExemploRouter = Express()

ExemploRouter.post("/rotaExemplo", FazAlgoDeExemplo)
ExemploRouter.get("/paginacaoExample", RetornaItemsDeExemplo)

export { ExemploRouter }