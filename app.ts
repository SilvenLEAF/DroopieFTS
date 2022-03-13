if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');     // to laod development variables on development mode
  // if we are on developemnt, load the development variables
  dotenv.config();
}



// core modules
import express, { Request, Response, NextFunction } from 'express';
import path from 'path'
import morgan from 'morgan';
import cors from 'cors';

// ----------------------------------FIRING EXPRESS APP
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `client/build`)));
app.use(morgan('tiny'));


/* -----------------------------------------
.                   routes
----------------------------------------- */
import dropboxRoute from './routes/Dropbox';
app.use('/api/v1/droopie', dropboxRoute);

// import pageRoute from './routes/Pages';
// app.use(pageRoute);

// CATCH-ALL HANDLER
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).sendFile(path.join(__dirname, 'client/build/index.html'));
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
});



// -----------------------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});