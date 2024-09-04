
// const express = require('express');
// const Product = require('../models/productModel');

// const router = express.Router();
// //קבלת כל המוצרים
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find({ });
//     return res.status(200).json({
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });
// router.get('/Pantry', async (req, res) => {
//   try {
//     const products = await Product.find({inPantry:true });
//     return res.status(200).json({
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });
// //הוספת מוצר חדש
// router.post('/', async (req, res) => {
//   try {
//     if (
//       !req.body.product_name ||
//       !req.body.category 
      
//     ) {
//       return res.status(400).send({
//         message: 'Please provide all required fields: product_name,  image, category, expiryDate',
//       });
//     }
  
//     const newProduct = {
//       product_name: req.body.product_name,
//       category: req.body.category,
//     };
    
  
//     const product = await Product.create(newProduct);
//     return res.status(201).send(product);
//    } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//  }
//  });
//  //קבלת המוצרים שפג תוקפם

// //קבלת מוצר בודד
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);

//     return res.status(200).json(product);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });


// //מחיקת מוצר
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Product.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     return res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// //שליחה לרשימת קניות






// // העברת מוצר שנמחק לרשימת קניות


// // נתיב לעדכון השדה inPantry של מוצר מסוים


// router.put('/pantry/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { inPantry } = req.body; // קבלת המידע על inPantry מהבקשה
//     // עדכון שדה inPantry במסד הנתונים
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId, 
//       { inPantry: inPantry }, 
//       { new: true } // מחזיר את המוצר המעודכן
//     );
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// module.exports = router;
const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

// קבלת כל המוצרים
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// קבלת מוצרים שנמצאים בפנרית
router.get('/Pantry', async (req, res) => {
  try {
    const products = await Product.find({ inPantry: true });
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// הוספת מוצר חדש
router.post('/', async (req, res) => {
  try {
    // בדיקה אם כל השדות הנדרשים קיימים
    if (!req.body.product_name || !req.body.category) {
      return res.status(400).send({
        message: 'Please provide all required fields: product_name, image, category, expiryDate',
      });
    }
  
    // יצירת אובייקט מוצר חדש
    const newProduct = {
      product_name: req.body.product_name,
      category: req.body.category,
    };
  
    // הוספת המוצר למסד הנתונים
    const product = await Product.create(newProduct);
    return res.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// קבלת מוצר בודד לפי מזהה
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // חיפוש המוצר לפי מזהה
    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// מחיקת מוצר לפי מזהה
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// עדכון השדה inPantry של מוצר מסוים לפי מזהה
router.put('/pantry/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { inPantry } = req.body; // קבלת המידע על inPantry מהבקשה

    // עדכון שדה inPantry במסד הנתונים
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, 
      { inPantry: inPantry }, 
      { new: true } // מחזיר את המוצר המעודכן
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
