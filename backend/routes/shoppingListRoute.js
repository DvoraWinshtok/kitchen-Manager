
const express = require('express');
//const shoppingList = require('../models/shppingListModel');
const Product=require('../models/productModel');
const ShoppingList = require('../models/shppingListModel');
 

const router = express.Router();

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ShoppingList.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.product_name ||
        !request.body.image ||
        !request.body.category||
        !request.body.amount
      ) {
        return response.status(400).send({
          message: 'Send all required fields',
        });
      }
      const { id } = request.params;
      const result = await ShoppingList.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).json({ message: 'product not found' });
      }
  
      return response.status(200).send({ message: 'product updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

  router.get('/', async (req, res) => {
    try {
      const shopping = await ShoppingList.find({ });
      return res.status(200).json({
        count: shopping.length,
        data: shopping,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });


router.post('/moveShoppingList/:id', async (req, res) => {
  try {
      const productId = req.params.id;
      console.log(productId);

      // חיפוש המוצר לפי ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // בדיקה אם המוצר כבר קיים ברשימת הקניות
      const existingItem = await ShoppingList.findOne({ product_name: product.product_name });

      if (existingItem) {
          // אם המוצר כבר קיים, הגדל את הכמות שלו
          existingItem.amount += 1;
          await existingItem.save();
          return res.status(200).json({ message: 'Product quantity updated in shopping list' });
      } else {
          // אם המוצר לא קיים, צור פריט חדש ברשימת הקניות
          const shoppingItem = new ShoppingList({
              product_name: product.product_name,
              category: product.category,
              image: product.image,
              amount: 1, // הגדרת כמות ראשונית
          });

          await shoppingItem.save();
          return res.status(200).json({ message: 'Product added to shopping list' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// דוגמא למסלול לעדכון כמות של פריט
router.put('/amount/:id', async (req, res) => {
  const { id } = req.params;
  console.log("id is:")
  console.log( id)
  const { amount } = req.body;
  console.log("is amount:")
console.log(amount)


  try {
    // עדכון הכמות במאגר הנתונים שלך (לדוגמא MongoDB)
    const updatedItem = await ShoppingList.findByIdAndUpdate(
      id,
      { amount: amount },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating amount', error });
  }
});

module.exports = router;



