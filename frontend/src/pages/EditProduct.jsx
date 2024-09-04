import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../component/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ isVisible, onClose }) => {  // נוסיף פרופס `isVisible` לשליטה בתצוגה של הטופס
  const [product_name, setProduct_name] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    'מוצרי חלב', 'פירות וירקות', 'דגנים וקטניות', 'חד פעמי', 'מוצרי בסיס', 'חטיפים וממתקים', 'משקאות', 'שימורים ומזון יבש', 'תבלינים ורטבים', 'אפיה', 'דגים ובשר'
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct_name(response.data.product_name);
        setCategory(response.data.category);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditProduct = () => {
    const data = {
      product_name,
      category
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/products/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/products');
        onClose(); // סגירת הטופס לאחר שמירת המוצר
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
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
      <h1 className="text-3xl my-4 text-center text-[#7a6236]">עריכת מוצר</h1>
      {loading && <Spinner />}
      <div className='flex flex-col'>
        {/* שדות הטופס */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>שם המוצר</label>
          <input
            type='text'
            value={product_name}
            onChange={(e) => setProduct_name(e.target.value)}
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
        <button
          className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
          onClick={handleEditProduct}
        >
          שמור פרטים
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
