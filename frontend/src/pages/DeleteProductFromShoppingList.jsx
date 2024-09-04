import React, { useState ,useEffect} from 'react';
import Spinner from '../component/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../component/BackButton';



const DeleteProductFromShoppingList = () => {
   
    //בדף מחיקה אני ארצה לשאול א הלקוח האם להוסיף את המוצר לרשימת  הקניות
//איך רשימת הקניות עובד
    //לא

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/ShoppingList/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('מוצר נמחק בהצלחה', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>מחיקת מוצר</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>בטוח למחוק את המוצר?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteProduct}
        >
   כן מחק
        </button>
      </div>
      
    </div>
  )

}
export default DeleteProductFromShoppingList;

