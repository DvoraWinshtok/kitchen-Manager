import { createContext, useContext, useState ,useEffect} from 'react'; 
import axios from 'axios';


const GlobalContext = createContext();                              /* 1 */

export const useGlobalContext = () => useContext(GlobalContext);    /* 2 */


const AppContext = ({ children }) => {                              /* 3 */
  const [recipes, setRecipes] = useState([]);  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        const uniqueCategories = [...new Set(data.map(recipe => recipe.category))];
        setCategories(['All', ...uniqueCategories]);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ recipes ,categories}}>              {/* 5 */}
      {children}                                                    {/* 6 */}
    </GlobalContext.Provider>
  );
};

export default AppContext;

