import express from "express";
import { Book } from '../models/bookModel.js';


const router = express.Router();


router.post('/',async(request, response) =>{
  try {
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook); 

    return response.status(201).send(book);
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({msg: error.message});
  }
});


router.get('/', async (request, response) =>{
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count : books.length,
      data: books
    });
    
  } catch (error) {
    console.log(error.message);
     response.status(500).send({ msg: error.message});
  }
})


router.get('/:id', async (request, response) =>{
  try {
     const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
    
  } catch (error) {
    console.log(error.message);
     response.status(500).send({ msg: error.message});
  }
})



router.put('/:id', async (request, response) =>{
  try {
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ){
      return response.status(400).send({
        message: 'send all the required files: title, author, publishYear'
      });
    }

    const { id } = request.params

    const result = await Book.findByIdAndUpdate(id, request.body);

    if(!result){
        return response.status(404).json({message: 'book not found'});
    }

    return response.status(200).send({message: 'book has updated'});
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message :error.message});
  }
})


router.delete('/:id', async(request, response) =>{
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
      return response.status(404).json({msg: "book not found"});  
    }

    return response.status(200).send({msg: "book has deleted"})
    
  } catch (error) {
    console.error(error.message);
    response.status(500).send({msg: error.message});
  }
})

export default router;