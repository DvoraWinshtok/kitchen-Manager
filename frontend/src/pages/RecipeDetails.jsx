
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { Nuvbar } from '../component/Frame38763';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import EditRecipe from './EditRecipe'; // ייבוא הקומפוננטה לעריכת מתכון

function RecipeDetails() {
  const { id } = useParams(); // מקבל את ה-id מה-URL
  const [recipe, setRecipe] = useState(null); // מצב לשמירת פרטי המתכון
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [error, setError] = useState(null); // מצב שגיאה
  const [isEditVisible, setEditVisible] = useState(false); // מצב לשליטה בפתיחה/סגירה של הטופס

  useEffect(() => {
    // קריאת שרת לקבלת פרטי המתכון לפי ID
    axios
      .get(`http://localhost:5000/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data); // עדכון מצב עם פרטי המתכון
        setLoading(false); // סיום מצב הטעינה
      })
      .catch((error) => {
        setError(error.message); // עדכון מצב שגיאה
        setLoading(false);
      });
  }, [id]); // תלות ב-id כדי לטעון מחדש כאשר ה-id משתנה

  return (
    <div>
      <Nuvbar />
      <div className="bg-[#f5eadb] min-h-screen p-8 relative">
        {/* כפתור להוספת מתכון חדש */}
        <button
          onClick={() => setEditVisible(!isEditVisible)}
          className="p-2 bg-[#ac8d75] text-white rounded-full mb-4 flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faEdit} size="lg" />
          <span>{isEditVisible ? 'סגור עריכה' : 'ערוך מתכון'}</span>
        </button>

        {/* בדיקת מצב טעינה ושגיאה */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin w-8 h-8 border-4 rounded-full text-brown-500"></div>
            <p className="ml-4 text-lg text-brown-700">...טוען מתכון</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
            <p>שגיאה: {error}</p>
          </div>
        ) : (
          <div className={`${isEditVisible ? 'blur-sm' : ''}`}>
            {/* הצגת פרטי המתכון */}
            {recipe && (
              <div className="max-w-4xl mx-auto p-4 bg-[#f0e4d7] relative flex items-start max-h-[80vh] overflow-y-auto rounded-lg">
                {/* צד שמאל - תמונה */}
                <div className="absolute left-0 top-0 h-full w-1/3">
                  <img
                    src={recipe.image}
                    alt={recipe.recipe_name}
                    className="w-full h-full object-cover rounded-l-md"
                  />
                </div>
                {/* צד ימין - פרטי מתכון */}
                <div className="ml-[33%] w-2/3 p-4">
                  <h1 className="text-3xl font-bold text-[#7a6236] mb-4 text-center">{recipe.recipe_name}</h1>
                  <div className="text-right">
                    <h2 className="text-2xl font-semibold text-[#7a6236] mb-2">מצרכים:</h2>
                    {/* הצגת המצרכים */}
                    <ul className="list-none text-right mb-4">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h2 className="text-2xl font-semibold text-[#7a6236] mb-2">אופן ההכנה:</h2>
                    <p className="text-gray-800 mb-4">{recipe.preparation}</p>
                    {/* כפתור להצגת המתכון המלא */}
                    <a
                      href={recipe.fullRecipe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#7a6236] text-white rounded shadow-md hover:bg-[#5e4b2f] transition"
                    >
                      הצג מתכון באתר המלא
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* הצגת הטופס לעריכת מתכון כאשר הוא גלוי */}
        {isEditVisible && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-md w-[500px] mx-auto max-h-[600px] overflow-y-auto absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <EditRecipe isVisible={isEditVisible} onClose={() => setEditVisible(false)} recipeId={id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
