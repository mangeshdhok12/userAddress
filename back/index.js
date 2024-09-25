

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

// Initialize the app
const app = express();
app.use(cors(
  
));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dhokmangesh678:mangesh123@useraddressclu.hqjst.mongodb.net/?retryWrites=true&w=majority&appName=useraddressclu').then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

  //routes
  app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
