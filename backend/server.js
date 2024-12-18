import express from 'express';
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import dbClient from './utils/db.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// init database
dbClient.isAlive()

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the FarmCollab API'
  })
})

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser())
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
