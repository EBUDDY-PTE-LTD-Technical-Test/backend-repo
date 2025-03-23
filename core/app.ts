import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from '../routes/userRoutes'
dotenv.config()

const app = express()


const PORT =process.env.PORT ||3000

app.use(cors())

app.use('/api',router)


app.get('/', (req, res) => {
    res.send('Backend API is running');
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


  export default app