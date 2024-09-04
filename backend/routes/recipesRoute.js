const express = require('express')
const Recipe = require ('../models/recipeModel');
const Product = require('../models/productModel');

const router = express.Router();

//זה עובד 
// router.get('/recipeFilter', async (req, res) => {
//   const category = req.query.category; // מקבל את הקטגוריה מהפרמטרים של השאילתה
//   try {
//     const products = await Product.find({ inPantry: true });
//     const availableIngredientsSet = new Set(products.map(p => p.product_name.toLowerCase().trim()));
//     const query = category ? { category: category } : {}; // סינון לפי קטגוריה אם סופק
//     const recipes = await Recipe.find(query);

//     const recipesWithMissingIngredients = [];
//     const recipesWithAllIngredients = [];

//     recipes.map(recipe => {
//       try {
//         const ingredients = JSON.parse(recipe.ingredients);
//         const [availableInRecipe, missingIngredients] = ingredients.reduce(
//           ([avail, miss], ingredient) => {
//             const ingredientLower = ingredient.toLowerCase().trim();
//             if (availableIngredientsSet.has(ingredientLower)) {
//               avail.push(ingredient);
//             } else {
//               miss.push(ingredient);
//             }
//             return [avail, miss];
//           },
//           [[], []]
//         );

//         if (missingIngredients.length > 0) {
//           recipesWithMissingIngredients.push({
//             _id: recipe._id, // כולל את ה-_id של המתכון
//             recipe_name: recipe.recipe_name,
//             image: recipe.image,
//             missingIngredients: missingIngredients,
//             availableIngredients: availableInRecipe
//           });
//         } else {
//           recipesWithAllIngredients.push({
//             _id: recipe._id, // כולל את ה-_id של המתכון
//             recipe_name: recipe.recipe_name,
//             image: recipe.image,
//             ingredients: ingredients
//           });
//         }

//       } catch (e) {
//         console.error(`Error parsing ingredients for recipe: ${recipe.recipe_name}`, e);
//       }
//     });

//     return res.status(200).json({
//       recipesWithMissingIngredients,
//       recipesWithAllIngredients
//     });

//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     res.status(500).json({ message: 'שגיאת שרת' });
//   }
// });
router.get('/recipeFilter', async (req, res) => {
  const category = req.query.category; // מקבל את הקטגוריה מהפרמטרים של השאילתה
  try {
    const products = await Product.find({ inPantry: true });
    const availableIngredientsSet = new Set(products.map(p => p.product_name.toLowerCase().trim()));
    const query = category ? { category: category } : {}; // סינון לפי קטגוריה אם סופק
    const recipes = await Recipe.find(query);

    const recipesWithMissingIngredients = [];
    const recipesWithAllIngredients = [];

    recipes.map(recipe => {
      try {
        // שימוש במערך ingredients ישירות ללא JSON.parse
        const ingredients = recipe.ingredients.map(ingredient => ingredient.trim().toLowerCase());

        const [availableInRecipe, missingIngredients] = ingredients.reduce(
          ([avail, miss], ingredient) => {
            if (availableIngredientsSet.has(ingredient)) {
              avail.push(ingredient);
            } else {
              miss.push(ingredient);
            }
            return [avail, miss];
          },
          [[], []]
        );

        if (missingIngredients.length > 0) {
          recipesWithMissingIngredients.push({
            _id: recipe._id,
            recipe_name: recipe.recipe_name,
            image: recipe.image,
            missingIngredients: missingIngredients,
            availableIngredients: availableInRecipe
          });
        } else {
          recipesWithAllIngredients.push({
            _id: recipe._id,
            recipe_name: recipe.recipe_name,
            image: recipe.image,
            ingredients: ingredients
          });
        }

      } catch (e) {
        console.error(`Error processing ingredients for recipe: ${recipe.recipe_name}`, e);
      }
    });

    return res.status(200).json({
      recipesWithMissingIngredients,
      recipesWithAllIngredients
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});



router.get('/', async (req, res) => {
    try {
      const recipes= await Recipe.find({});
  
      return res.status(200).json({
        count: recipes.length,
        data: recipes,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  // router.post('/', async (req, res) => {
  //   try {
  //     if (
  //       !req.body.recipe_name ||
  //       !req.body.preparation ||
  //       !req.body.image||
  //       !req.body.category,
  //       !req.body.expiryDate
  //     ) {
  //       return res.status(400).send({
  //         message: 'Missing required fields: recipe_name, preparation, image, category',
  //       });
  //     }
  //     const newRecipe = {
  //       recipe_name: req.body.recipe_name,
  //       preparation: req.body.preparation,
  //       image: req.body.image,
  //       category:req.body.category,
  //       expiryDate:req.body.expiryDate

        
  //     };
  
  //     const recipe = await Recipe.create(newRecipe);
  
  //     return res.status(201).send(recipe);
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).send({ message: error.message });
  //   }
  // });
  router.post('/', async (req, res) => {
    try {
      // בדיקה לשדות חובה
      if (
        !req.body.recipe_name ||
        !req.body.preparation ||
        !req.body.category ||
        !Array.isArray(req.body.ingredients) || // וידוא שהמצרכים מגיעים כמערך
        req.body.ingredients.length === 0
      ) {
        return res.status(400).send({
          message: 'Missing required fields: recipe_name, preparation, category, ingredients',
        });
      }
  
      // הכנה של אובייקט מתכון חדש
      const newRecipe = {
        recipe_name: req.body.recipe_name,
        preparation: req.body.preparation,
        image: req.body.image || null,
        category: req.body.category,
        ingredients: req.body.ingredients,  // שדה מצרכים שמתקבל מהבקשה
        expiryDate: req.body.expiryDate || null,
      };
  
      const recipe = await Recipe.create(newRecipe);
  
      return res.status(201).send(recipe);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const recipe = await Recipe.findById(id);
      
      return response.status(200).json(recipe);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  


// נתיב לעריכת מתכון קיים
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipe_name, preparation, image, category, ingredients, fullRecipe } = req.body;

    // בדיקה לוודא שכל השדות הדרושים קיימים
    if (!recipe_name || !preparation || !category || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).send({
        message: 'Missing required fields: recipe_name, preparation, category, ingredients',
      });
    }

    // עדכון המתכון במסד הנתונים
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { recipe_name, preparation, image, category, ingredients, fullRecipe },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).send({ message: 'Server error' });
  }
});



module.exports = router