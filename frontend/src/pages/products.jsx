
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillPlusSquare } from "react-icons/ai";
import { Nuvbar } from '../component/Frame38763';
import CreateProduct from './createProduct'; // ייבוא הקומפוננטה של הטופס

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormVisible, setFormVisible] = useState(false); // מצב לשליטה בפתיחה/סגירה של הטופס

  // קטגוריות מוגדרות מראש עם סמלים מתאימים
  const predefinedCategories = [
    { name: 'מוצרי חלב', icon: '/images/milk.png' },
    { name: 'חטיפים וממתקים', icon: '/images/snacks.png' },
    { name: 'משקאות', icon: '/images/drinks.png' },
    { name: 'פירות וירקות', icon: '/images/vegetables.png' },
    { name: 'דגנים וקטניות', icon: '/images/LegumesGrains.png' },
    { name: 'שימורים ומזון יבש ', icon: '/images/CannedDryFood.png' },
    { name: 'אפיה', icon: '/images/bakery.png' },
    { name: 'תבלינים ורטבים', icon: '/images/spices.png' },
    { name: 'חד פעמי', icon: '/images/disposable.png' },
    { name: 'בשר ודגים', icon: '/images/meat.png' },
    { name: 'מוצרי בסיס', icon: '/images/basic.png' },
  ];

  return (
    <div className="bg-[#f5eadb]">
      <Nuvbar />
      <div className="bg-[#f5eadb] min-h-screen p-4 pt-2 relative">
        {/* כפתור להוספת מוצר חדש */}
        <button 
          onClick={() => setFormVisible(!isFormVisible)} 
          className="p-2 bg-[#ac8d75] text-white rounded-full mb-4 flex items-center justify-center space-x-2"
        >
          <AiFillPlusSquare className="text-2xl mr-2" />
          <span>{isFormVisible ? 'סגור טופס' : 'הוסף מוצר חדש'}</span>
        </button>

        {/* הצגת הטופס ליצירת מוצר חדש */}
        {isFormVisible && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-md w-[500px] mx-auto max-h-[600px] overflow-y-auto absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <CreateProduct isVisible={isFormVisible} onClose={() => setFormVisible(false)} />
          </div>
        )}

        {/* כותרת מתחת לניוובאר */}
        <h1 className="text-3xl font-bold text-[#7a6236] mb-4 text-center">קטגוריות מוצרים</h1>

        {/* כפתורים לקטגוריות עם סמלים */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center ${isFormVisible ? 'blur-sm' : ''}`}>
          {predefinedCategories.map((category, index) => (
            <Link to={`/products/category/${category.name}`} key={index}>
              <div
                onClick={() => setSelectedCategory(category.name)}
                className="relative w-[140px] h-[150px] bg-[#f5eadb] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* חצי עליון בהיר */}
                <div className="absolute top-0 left-0 w-full h-1/2 flex items-center justify-center">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* חלק תחתון כהה עם טקסט */}
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

export default Products;
