const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        recipe_name: {
            type: String,
            required: true
        },
        preparation: {
            type: String,
            default: ""
        },
        fullRecipe: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        },
        ingredients: {
            type: [String],
            required: true
        }
    }
);

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;
