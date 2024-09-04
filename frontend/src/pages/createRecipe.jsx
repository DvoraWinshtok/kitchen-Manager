
import React, { useState } from 'react';
import Spinner from '../component/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = ({ isVisible, onClose }) => { // נוסיף פרופס `isVisible` לשליטה בתצוגה של הטופס
  const [recipe_name, setRecipe_name] = useState('');
  const [preparation, setPreparation] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [fullRecipe, setFullRecipe] = useState('');
  const [loading, setLoading] = useState(false);
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
    const ingredientsArray = ingredients.split('-').map(item => item.trim());

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

    setLoading(true);
    axios
      .post('http://localhost:5000/recipes', data)
      .then(() => {
        setLoading(false);
        navigate('/');
        onClose(); // סגירת הטופס לאחר שמירת המתכון
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  if (!isVisible) {
    return null; // אם isVisible הוא false, לא מציגים את הטופס
  }

  return (
    <div className="mt-4 p-6 bg-[#f5eadb] rounded-lg shadow-lg">
      <button className="absolute top-2 right-2 text-[#7a6236] hover:text-[#5e4b2f]" onClick={onClose}>
        &times;
      </button>
      <h1 className="text-3xl my-4 text-center text-[#7a6236]">מתכון חדש</h1>
      {loading && <Spinner />}
      <div className='flex flex-col'>
        {/* שדות הטופס */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>שם המתכון</label>
          <input
            type='text'
            value={recipe_name}
            onChange={(e) => setRecipe_name(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>אופן ההכנה</label>
          <textarea
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>תמונה (לא חובה)</label>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
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
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>קישור למתכון המלא</label>
          <input
            type='text'
            value={fullRecipe}
            onChange={(e) => setFullRecipe(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <button
          className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
          onClick={handleSaveRecipe}
        >
          שמור
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
