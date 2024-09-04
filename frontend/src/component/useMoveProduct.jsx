// src/hooks/useMoveProduct.js

// src/hooks/useMoveProduct.js

import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const useMoveProduct = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const moveProductToShoppingList = async (id) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/ShoppingList/moveShoppingList/${id}`);
      setLoading(false);
      enqueueSnackbar('מוצר הועבר בהצלחה', { variant: 'success' });
      navigate('/shoppingList');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('אירעה שגיאה בהעברת המוצר', { variant: 'error' });
      console.error('Error moving product:', error);
    }
  };

  return { moveProductToShoppingList, loading };
};

export default useMoveProduct;
