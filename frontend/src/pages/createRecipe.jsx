import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = ({ isVisible, onClose }) => {
  const [recipe_name, setRecipe_name] = useState(''); // שמירה של שם המתכון
  const [preparation, setPreparation] = useState(''); // שמירה של אופן ההכנה
  const [image, setImage] = useState(''); // שמירה של קישור לתמונה
  const [category, setCategory] = useState(''); // שמירה של קטגוריית המתכון
  const [ingredients, setIngredients] = useState(''); // שמירה של מצרכים כטקסט
  const [fullRecipe, setFullRecipe] = useState(''); // שמירה של קישור למתכון המלא
  const [loading, setLoading] = useState(false); // שמירה של מצב הטעינה
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // שמירה של מצב הודעת ההצלחה

  const navigate = useNavigate();

  const categories = [
    'ארוחת בוקר',
    'תוספות',
    'לחמים',
    'עוגות וקינוחים',
    'דגים',
    'בשרים ועופות',
    'מרקים',
    'סלטים'
  ];

  const handleSaveRecipe = () => {
    const ingredientsArray = ingredients.split('-').map(item => item.trim()); // המרת מצרכים למערך

    // בדיקה אם כל השדות הנדרשים מלאים
    if (!recipe_name || !preparation || !category || ingredientsArray.length === 0) {
      alert('יש למלא את כל השדות הנדרשים.');
      return;
    }

    const data = {
      recipe_name,
      preparation,
      image: image || null,
      category,
      ingredients: ingredientsArray,
      fullRecipe,
    };

    setLoading(true); // התחלת מצב טעינה
    axios
      .post('http://localhost:5000/recipes', data)
      .then(() => {
        setLoading(false); // סיום מצב טעינה
        setShowSuccessMessage(true); // הצגת הודעת הצלחה
        setTimeout(() => {
          setShowSuccessMessage(false); // הסתרת הודעת הצלחה אחרי 3 שניות
          onClose(); // סגירת הטופס לאחר שמירת המתכון
          navigate('/recipes'); // ניווט לעמוד הבית
        }, 3000);
      })
      .catch((error) => {
        setLoading(false); // סיום מצב טעינה במקרה של שגיאה
        console.log(error);
      });
  };

  // אם isVisible הוא false, לא מציגים את הטופס
  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-4 p-6 bg-[#f5eadb] rounded-lg shadow-lg relative">
      <button className="absolute top-2 right-2 text-[#7a6236] hover:text-[#5e4b2f]" onClick={onClose}>
        &times;
      </button>
      <h1 className="text-3xl my-4 text-center text-[#7a6236]">הוסף מתכון חדש</h1>
      
      {/* הודעת הצלחה בצבע חום */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-[#7a6236] text-white px-4 py-2 rounded-md shadow-lg">
          המתכון נוסף בהצלחה!
        </div>
      )}

      <div className='flex flex-col'>
        {/* שדה להזנת שם המתכון */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>שם המתכון</label>
          <input
            type='text'
            value={recipe_name}
            onChange={(e) => setRecipe_name(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>

        {/* שדה להזנת אופן ההכנה */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>אופן ההכנה</label>
          <textarea
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>

        {/* שדה להזנת קישור לתמונה (לא חובה) */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>תמונה (לא חובה)</label>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>

        {/* שדה לבחירת קטגוריה */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>קטגוריה</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md bg-white text-[#7a6236]'
          >
            <option value=''>בחר קטגוריה</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* שדה להזנת מצרכים */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>מצרכים (הפרד עם קו: מצרך1 - מצרך2)</label>
          <input
            type='text'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
            placeholder='לדוגמה: קמח - סוכר - ביצים'
          />
        </div>

        {/* שדה להזנת קישור למתכון המלא */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>קישור למתכון המלא</label>
          <input
            type='text'
            value={fullRecipe}
            onChange={(e) => setFullRecipe(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>

        {/* כפתור שמירה */}
        <button
          className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
          onClick={handleSaveRecipe}
        >
          שמור
        </button>
      </div>
    </div>
  );
};

export default CreateRecipe;
