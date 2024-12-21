import express from 'express';
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbClient from './utils/db.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// init database
dbClient.isAlive()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the FarmCollab API'
  })
})

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser())
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
