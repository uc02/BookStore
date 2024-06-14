import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'; 
 
const app = express();

app.use(express.json());

app.use(cors());

//better way
// app.use(
//   cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// })
// )

app.get('/', (request, response) =>{
   console.log(request);
   return response.status(200).send('well done');
});
 
app.use('/books', booksRoute);

mongoose
   .connect(mongoDBURL)
   .then(() =>{
    console.log("app is connected") 
    app.listen(PORT, () =>{
      console.log(`server is running on ${PORT}`);
    });
    
   })
   .catch((error) =>{
     console.log(error.message); 
   })