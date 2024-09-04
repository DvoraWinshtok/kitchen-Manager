import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/createRecipe";
import CreateProduct from "./pages/createProduct";
import Products from "./pages/products";
import DeleteProduct from "./pages/DeleteProduct";
import ShoppingList from "./pages/ShoppingList";
import Recipes from "./pages/recipes";
import RecipeFilter from "./pages/RecipeFinder";
import Pantry from "./pages/Pantry";
import CategoryProducts from "./pages/CategoryProducts";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />

        <Route path="/recipes/createRecipe" element={<CreateRecipe />} />
        <Route path="/products/createProduct" element={<CreateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:category" element={<CategoryProducts />} />
        <Route path="/products/deleteProduct/:id" element={<DeleteProduct/>}/>
        <Route path="/shoppingList" element={<ShoppingList/>}/>
        <Route path="/pantry" element={<Pantry/>}/>
        <Route path="/recipes/category/:category" element={<RecipeFilter />} />
        <Route path='/recipes/details/:id' element={<RecipeDetails />} />
        <Route path="/recipes/editRecipe/:id" element={<EditRecipe/>}/>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
