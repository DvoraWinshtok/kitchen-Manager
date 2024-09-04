
// // import React, { useState } from 'react';

// // const Recipe = ({ recipe }) => {
// //   const [showPreparation, setShowPreparation] = useState(false);

// //   const togglePreparation = () => {
// //     setShowPreparation(!showPreparation);
// //   };

// //   return (
// //     <div className="max-w-sm bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mb-4">
// //       <img
// //         className="w-full h-48 object-cover"
// //         src={recipe.image}
// //         alt={recipe.recipe_name}
// //       />
// //       <div className="p-4">
// //         <h2 className="text-lg font-bold mb-2 text-gray-100">{recipe.recipe_name}</h2>
// //         <p className="text-gray-400 mb-4">{recipe.category}</p>
// //         {recipe.preparation === "" ? (
// //           <a 
// //             href={recipe.fullRecipe} 
// //             target="_blank" 
// //             rel="noopener noreferrer"
// //             className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
// //           >
// //             למתכון המלא
// //           </a>
// //         ) : (
// //           <>
// //             <button 
// //               onClick={togglePreparation} 
// //               className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200"
// //             >
// //               לאופן ההכנה
// //             </button>
// //             <div 
// //               className={`mt-4 ${showPreparation ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden transition-max-height duration-300`}
// //             >
// //               {showPreparation && (
// //                 <h3 className="text-gray-300">{recipe.preparation}</h3>
// //               )}
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Recipe;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useGlobalContext } from '../appContext';

// const Recipes = () => {
//   const { recipes } = useGlobalContext();  

//   // קטגוריות קבועות מראש
//   const predefinedCategories = ['ארוחת בוקר', 'עוגות וקינוחים', 'תוספות', 'דגים', 'בשרים ועופות', 'לחמים', 'מרקים', 'סלטים'];

//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <h1>מתכונים לפי קטגוריות</h1>
      
//       {/* כפתורי קטגוריות קבועות מראש */}
//       <div className="mb-4">
//         {predefinedCategories.map((category, index) => (
//           <Link to={`/recipes/category/${category}`} key={index}>
//             <button
//               onClick={() => handleCategoryClick(category)}
//               className={`p-2 m-1 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recipes;
import  { useState } from 'react';

const Recipe = ({ recipe }) => {
  const [showPreparation, setShowPreparation] = useState(false);

  const togglePreparation = () => {
    setShowPreparation(!showPreparation);
  };

  return (
    <div className="max-w-sm bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mb-4">
      <img
        className="w-full h-48 object-cover"
        src={recipe.image}
        alt={recipe.recipe_name}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-gray-100">{recipe.recipe_name}</h2>
        <p className="text-gray-400 mb-4">{recipe.category}</p>
        {recipe.preparation === "" ? (
          <a 
            href={recipe.fullRecipe} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
          >
            למתכון המלא
          </a>
        ) : (
          <>
            <button 
              onClick={togglePreparation} 
              className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200"
            >
              לאופן ההכנה
            </button>
            <div 
              className={`mt-4 ${showPreparation ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden transition-max-height duration-300`}
            >
              {showPreparation && (
                <h3 className="text-gray-300">{recipe.preparation}</h3>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recipe;
