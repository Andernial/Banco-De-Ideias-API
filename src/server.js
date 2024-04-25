import express from "express"
import { testConnection } from "./database/connection.js"
import { routers } from "./routes/index.routes.js"
import { errorHandling } from "./middlewares/errorHandling.js"
const app = express()
const port = 3000

app.use(express.json())
app.use(routers)
app.use(errorHandling)

app.listen(port, () =>{
    testConnection()
    console.log(`servidor aberto na porta ${port}`)
})