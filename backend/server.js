import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { dbConnection } from './config/database.js'
import { connectCloudinary } from './config/cloudinary.js'
import userRoute from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import orderRoute from './routes/order.route.js'




const app = express()
const port = process.env.PORT

await dbConnection()
connectCloudinary()

console.log(process.env.CLOUDINARY_CLOUD_NAME);

app.use(express.json())
app.use(cors())

app.use('/api/user',userRoute)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))