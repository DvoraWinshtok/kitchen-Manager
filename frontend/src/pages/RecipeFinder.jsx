
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Nuvbar } from '../component/Frame38763';

function RecipeFilter() {
    const { category } = useParams();
    const [recipesWithAllIngredients, setRecipesWithAllIngredients] = useState([]);
    const [recipesWithMissingIngredients, setRecipesWithMissingIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/recipes/recipeFilter?category=${category}`)
            .then(response => {
                setRecipesWithAllIngredients(response.data.recipesWithAllIngredients);
                setRecipesWithMissingIngredients(response.data.recipesWithMissingIngredients);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [category]);

    return (
        <div>
            <Nuvbar />
            <div className="bg-[#f5eadb] min-h-screen p-8">
                <h1 className="text-3xl font-bold text-[#7a6236] mb-6 text-center">מתכונים לפי קטגוריה: {category}</h1>

                {/* הודעת טעינה או שגיאה */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-brown-500"></div>
                        <p className="ml-4 text-lg text-brown-700">טוען מתכונים...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                        <p>שגיאה: {error}</p>
                    </div>
                ) : (
                    <>
                        {/* כפתורים לבחירת סוג המתכונים להצגה */}
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => setActiveTab('available')}
                                className={`px-4 py-2 mx-2 rounded ${
                                    activeTab === 'available' ? 'bg-[#7a6236] text-white' : 'bg-[#f5eadb] text-[#7a6236]'
                                } border border-[#ac8d75] shadow-md`}
                            >
                                מתכונים זמינים
                            </button>
                            <button
                                onClick={() => setActiveTab('missing')}
                                className={`px-4 py-2 mx-2 rounded ${
                                    activeTab === 'missing' ? 'bg-[#7a6236] text-white' : 'bg-[#f5eadb] text-[#7a6236]'
                                } border border-[#ac8d75] shadow-md`}
                            >
                                מתכונים עם מצרכים חסרים
                            </button>
                        </div>

                        {/* הצגת מתכונים לפי הכרטיסייה הפעילה */}
                        {activeTab === 'available' ? (
                            <div className="max-w-4xl mx-auto p-4">
                                {recipesWithAllIngredients.length > 0 ? (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {recipesWithAllIngredients.map((recipe) => (
                                            <li
                                                key={recipe._id}
                                                className="bg-white rounded-lg shadow-lg overflow-hidden relative text-right cursor-pointer"
                                            >
                                                <Link to={`/recipes/details/${recipe._id}`} className="block">
                                                    <div className="p-4">
                                                        <h3 className="text-xl font-semibold text-[#7a6236]">{recipe.recipe_name}</h3>
                                                    </div>
                                                    <div className="relative">
                                                        {recipe.image && (
                                                            <img
                                                                src={recipe.image}
                                                                alt={recipe.recipe_name}
                                                                className="w-full h-40 object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-[#7a6236] text-center">
                                        <p>אין מתכונים זמינים עם כל המצרכים</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto p-4">
                                {recipesWithMissingIngredients.length > 0 ? (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {recipesWithMissingIngredients.map((recipe) => (
                                            <li
                                                key={recipe._id}
                                                className="bg-white rounded-lg shadow-lg overflow-hidden relative text-right cursor-pointer"
                                            >
                                                <Link to={`/recipes/details/${recipe._id}`} className="block">
                                                    <div className="p-4">
                                                        <h3 className="text-xl font-semibold text-[#7a6236]">{recipe.recipe_name}</h3>
                                                    </div>
                                                    <div className="relative">
                                                        {recipe.image && (
                                                            <img
                                                                src={recipe.image}
                                                                alt={recipe.recipe_name}
                                                                className="w-full h-40 object-cover"
                                                            />
                                                        )}
                                                        <div className="absolute top-2 right-2 bg-white bg-opacity-70 text-sm text-gray-700 p-1 rounded">
                                                            <p>חסרים: {recipe.missingIngredients.join(", ")}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-[#7a6236] text-center">
                                        <p>אין מתכונים עם מצרכים חסרים</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipeFilter;
