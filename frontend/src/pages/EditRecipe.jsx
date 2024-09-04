
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = ({ isVisible, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    recipe_name: '',
    preparation: '',
    image: '',
    category: '',
    ingredients: '',
    fullRecipe: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then(response => {
        const data = response.data;
        setRecipe({
          ...data,
          ingredients: data.ingredients.join(' - ')
        });
        setLoading(false);
      })
      .catch(error => {
        setError('Error loading recipe data');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSave = () => {
    const ingredientsArray = recipe.ingredients.split('-').map(item => item.trim());

    if (!recipe.recipe_name || !recipe.preparation || !recipe.category || ingredientsArray.length === 0) {
      alert('יש למלא את כל השדות הנדרשים.');
      return;
    }

    axios.put(`http://localhost:5000/recipes/${id}`, {
      ...recipe,
      ingredients: ingredientsArray
    })
      .then(() => {
        navigate(`/recipes/details/${id}`);
        onClose(); // Close the form after saving the recipe
      })
      .catch(error => {
        console.error('Error updating recipe:', error);
        setError('Error updating recipe');
      });
  };

  if (!isVisible) {
    return null; // Do not display the form if isVisible is false
  }

  if (loading) {
    return <p>טוען נתוני מתכון...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-4 p-6 bg-[#f5eadb] rounded-lg shadow-lg">
      <button className="absolute top-2 right-2 text-[#7a6236] hover:text-[#5e4b2f]" onClick={onClose}>
        &times;
      </button>
      <h1 className="text-3xl my-4 text-center text-[#7a6236]">עריכת מתכון</h1>
      <div className='flex flex-col'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>שם המתכון</label>
          <input
            type='text'
            name='recipe_name'
            value={recipe.recipe_name}
            onChange={handleInputChange}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>אופן ההכנה</label>
          <textarea
            name='preparation'
            value={recipe.preparation}
            onChange={handleInputChange}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>תמונה (לא חובה)</label>
          <input
            type='text'
            name='image'
            value={recipe.image}
            onChange={handleInputChange}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>קטגוריה</label>
          <select
            name='category'
            value={recipe.category}
            onChange={handleInputChange}
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
            name='ingredients'
            value={recipe.ingredients}
            onChange={handleInputChange}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
            placeholder='לדוגמה: קמח - סוכר - ביצים'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>קישור למתכון המלא</label>
          <input
            type='text'
            name='fullRecipe'
            value={recipe.fullRecipe}
            onChange={handleInputChange}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>
        <button
          className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
          onClick={handleSave}
        >
          שמור שינויים
        </button>
      </div>
    </div>
  );
}

export default EditRecipe;
