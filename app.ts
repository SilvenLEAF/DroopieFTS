if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv');     // to laod development variables on development mode
  // if we are on developemnt, load the development variables
  dotenv.config();
}



// core modules
import express, { Request, Response, NextFunction } from 'express';
import path from 'path'



// ----------------------------------FIRING EXPRESS APP
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `client`)));



/* -----------------------------------------
.                   config
----------------------------------------- */
// other configs will come here



/* -----------------------------------------
.                   routes
----------------------------------------- */
import dropboxRoute from './routes/Dropbox';
app.use('/api/v1/droopie', dropboxRoute);

import pageRoute from './routes/Pages';
app.use(pageRoute);

// CATCH-ALL HANDLER
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

// ERRORS HANDLER
app.use((errorObjectWithRequestAndResponse: { err: any, req: Request, res: Response }) => {
  const { err, req, res } = errorObjectWithRequestAndResponse;
  
  console.log(err.message);
  console.log(err);

  res.status(500).json({ msg: 'Server Error!', error: err.message || 'Error occurred while processing!' });
});



// -----------------------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});