import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

const app = express()

connectDB()

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Mount the 'productRoutes' middleware at the '/api/products' base path
// This allows handling routes related to products under the '/api/products' URL
// For example, '/api/products' will be the main page, and additional routes can be added
// The 'productRoutes' module contains the specific routes and their corresponding handlers
// This modular approach helps organize and manage product-related routes in the application
app.use('/api/products', productRoutes) 

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
