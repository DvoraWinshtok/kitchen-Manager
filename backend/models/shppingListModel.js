const mongoose = require('mongoose')

const shoppingListSchema = new mongoose.Schema(
    {
        product_name :
        {
            type: String,
            required: true
        },
        
  
        category: 
        {
            type: String,
            required: true
        },
        amount:
        {
            type:Number,
             default:1
            }

      
    }
    
);

const ShoppingList = mongoose.model('shoppingList',shoppingListSchema)
module.exports = ShoppingList



