import 'dotenv/config'
import _db from './config/db.js'
import express from "express"
import router from './src/router/index.js'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT ${PORT}`))
