const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect');
require('dotenv').config() 
const recipesRoute =require('./routes/recipesRoute')
const productsRoute=require('./routes/productsRoute')
 const ShoppingListRoute=require('./routes/shoppingListRoute')

const app = express()


app.use(express.json());



app.use(cors());
app.use('/recipes',recipesRoute );
 app.use('/products',productsRoute)
 app.use('/ShoppingList',ShoppingListRoute);


app.get('/', (req, res)=>{
  res.send ("<h2>Sharat</h2>")
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);                  
    app.listen(5000, () =>
      console.log('Masad netunim connected. Server is listening on port 5000...'));
  } catch (error) {
    console.log(error);
  }
};

start();
