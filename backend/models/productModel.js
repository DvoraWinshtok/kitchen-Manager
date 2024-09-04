const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
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
     
        inPantry: 
        { type: Boolean, 
            default: false 

        },

            
    }
    
);

const Product = mongoose.model('products',productSchema)
module.exports = Product



