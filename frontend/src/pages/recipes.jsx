
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nuvbar } from '../component/Frame38763';
import CreateRecipe from './createRecipe'; // ייבוא הקומפוננטה של הטופס

// Image paths for icons
const iconPaths = {
  breakfast: '/images/breakfast.png',   // You will need to provide the actual paths for these icons
  desserts: '/images/cake.png',
  sides: '/images/extras.png',
  fish: '/images/fish.png',
  meats: '/images/meats.png',
  bread: '/images/bread.png',
  soups: '/images/soups.png',
  salads: '/images/saled.png',
};

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormVisible, setFormVisible] = useState(false); // מצב לשליטה בפתיחה/סגירה של הטופס

  // Predefined categories with corresponding icons
  const predefinedCategories = [
    { name: 'ארוחת בוקר', iconPath: iconPaths.breakfast },
    { name: 'עוגות וקינוחים', iconPath: iconPaths.desserts },
    { name: 'תוספות', iconPath: iconPaths.sides },
    { name: 'דגים', iconPath: iconPaths.fish },
    { name: 'בשרים ועופות', iconPath: iconPaths.meats },
    { name: 'לחמים', iconPath: iconPaths.bread },
    { name: 'מרקים', iconPath: iconPaths.soups },
    { name: 'סלטים', iconPath: iconPaths.salads }
  ];

  return (
    <div className="bg-[#f5eadb]">
      <Nuvbar />
      <div className="bg-[#f5eadb] min-h-screen p-4 pt-2 relative">
        {/* כפתור להוספת מתכון חדש */}
        <button 
          onClick={() => setFormVisible(!isFormVisible)} 
          className="p-2 bg-[#ac8d75] text-white rounded-full mb-4 flex items-center justify-center space-x-2"
        >
          <img src="/images/add.png" alt="Add Icon" className="w-5 h-5" />
          <span>{isFormVisible ? 'סגור טופס' : 'הוסף מתכון חדש'}</span>
        </button>

        {/* הצגת הטופס ליצירת מתכון חדש */}
        {isFormVisible && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-md w-[500px] mx-auto max-h-[600px] overflow-y-auto absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <CreateRecipe isVisible={isFormVisible} onClose={() => setFormVisible(false)} />
          </div>
        )}

        {/* Title under the navbar */}
        <h1 className="text-3xl font-bold text-[#7a6236] mb-4 text-center">קטגוריות מתכונים</h1>

        {/* Category buttons with icons */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-1 justify-items-center ${isFormVisible ? 'blur-sm' : ''}`}> {/* הקטנת רווחים בין הקטגוריות */}
          {predefinedCategories.map((category, index) => (
            <Link to={`/recipes/category/${category.name}`} key={index}>
              <div
                onClick={() => setSelectedCategory(category.name)}
                className="relative w-[140px] h-[150px] bg-[#f5eadb] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Upper light half */}
                <div className="absolute top-0 left-0 w-full h-1/2 flex items-center justify-center">
                  <img
                    src={category.iconPath}
                    alt={category.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Darker bottom part with text */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#ac8d75] flex items-center justify-center rounded-b-lg">
                  <span className="text-white text-sm font-medium text-center">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
