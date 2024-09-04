

import React, { useState } from 'react';
import Spinner from '../component/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Nuvbar } from '../component/Frame38763';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdShoppingCart } from 'react-icons/md';

const DeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('המוצר נמחק בהצלחה', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('שגיאה במחיקת המוצר', { variant: 'error' });
        console.log(error);
      });
  };

  const handleMoveProduct = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/ShoppingList/moveShoppingList/${id}`);
      setLoading(false);
      enqueueSnackbar('המוצר הועבר בהצלחה לרשימת הקניות', { variant: 'success' });
      navigate('/shoppingList');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('אירעה שגיאה בהעברת המוצר', { variant: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#f5eadb] to-[#e2c7a1] flex flex-col'>
      <Nuvbar />

      <div className='flex-grow flex flex-col items-center justify-start p-6'>
        <h1 className='text-4xl font-bold text-[#391e0f] my-8 drop-shadow-lg text-center'>מחיקת מוצר</h1>
        {loading ? <Spinner /> : null}

        {/* פעולה של מחיקת מוצר */}
        <div className='flex flex-col items-center space-y-4 my-4'>
          <div
            className='flex items-center space-x-2 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out'
            onClick={handleDeleteProduct}
          >
            <RiDeleteBin5Line className='text-3xl text-[#391e0f]' />
            <span className='text-xl font-medium text-[#391e0f]'>מחק מוצר</span>
          </div>

          {/* פעולה של העברה לרשימת הקניות */}
          <div
            className='flex items-center space-x-2 cursor-pointer hover:text-green-600 transition duration-300 ease-in-out'
            onClick={handleMoveProduct}
          >
            <MdShoppingCart className='text-3xl text-[#391e0f]' />
            <span className='text-xl font-medium text-[#391e0f]'>העבר לרשימת הקניות</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
