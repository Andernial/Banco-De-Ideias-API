import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { testConnection } from "./database/connection.js"
import { routers } from "./routes/index.routes.js"
import { errorHandling } from "./middlewares/errorHandling.js"

dotenv.config()
const app = express()
const port = process.env.PORT



app.use(express.json())
app.use(cors())
app.use(routers)
app.use(errorHandling)


app.listen(port, () =>{
    testConnection()
    console.log(`servidor aberto na porta ${port}`)
})