
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineKitchen } from "react-icons/md";
import useMoveProduct from '../component/useMoveProduct';
import { Nuvbar } from '../component/Frame38763';
import Search from '../component/Search';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { moveProductToShoppingList, loading } = useMoveProduct();

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        const data = response.data.data.map(product => ({
          ...product,
          product_name: product.product_name.trim(),
          category: product.category.trim().toLowerCase()
        }));

        setProducts(data);

        if (category) {
          const filtered = data.filter(product => product.category === category.toLowerCase());
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  const handleProductClick = async (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (!selectedProduct) return;

    const newInPantryStatus = !selectedProduct.inPantry;

    const updatedProducts = products.map(product =>
      product._id === productId ? { ...product, inPantry: newInPantryStatus } : product
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts.filter(product => product.category === category.toLowerCase()));

    setFeedbackMessage(newInPantryStatus ? 'מוצר נוסף למזווה' : 'מוצר הוסר מהמזווה');

    setTimeout(() => setFeedbackMessage(''), 2000);

    try {
      await axios.put(`http://localhost:5000/products/pantry/${productId}`, { inPantry: newInPantryStatus });
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleShoppingListClick = async (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (!selectedProduct) return;

    const newInShoppingListStatus = !selectedProduct.inShoppingList;

    const updatedProducts = products.map(product =>
      product._id === productId ? { ...product, inShoppingList: newInShoppingListStatus } : product
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts.filter(product => product.category === category.toLowerCase()));

    setFeedbackMessage(newInShoppingListStatus ? 'מוצר נוסף לרשימת קניות' : 'מוצר הוסר מרשימת קניות');

    setTimeout(() => setFeedbackMessage(''), 2000);

    try {
      await moveProductToShoppingList(productId);
      console.log('Product moved to shopping list successfully');
    } catch (error) {
      console.error('Error moving product to shopping list:', error);
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${productToDelete}`);

        const updatedProducts = products.filter(product => product._id !== productToDelete);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts.filter(product => product.category === category.toLowerCase()));

        setFeedbackMessage('המוצר נמחק בהצלחה');
        setTimeout(() => setFeedbackMessage(''), 2000);

        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
    setShowDeleteConfirm(false);
  };

  const showDeleteConfirmation = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteConfirm(false);
  };

  // New function to handle search
  const handleSearch = (searchValue) => {
    const filtered = products.filter(product => 
      product.category === category.toLowerCase() && 
      product.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
            <Nuvbar />

    <div className="bg-[#f5eadb] min-h-screen p-8 flex flex-col items-center">

      <h1 className="text-5xl font-bold text-[#7a6236] mb-4" style={{ fontFamily: "'Cursive', sans-serif" }}>
        מוצרים - {category}
      </h1>

      <Search onSearch={handleSearch} />

      <p className="text-lg text-[#7a6236] mb-6 text-center" style={{ fontFamily: "'Cursive', sans-serif" }}>
        <MdOutlineKitchen className="inline text-xl text-[#7a6236]" /> לבחירת מוצרים לחץ על
      </p>

      {feedbackMessage && (
        <div className="mb-4 p-2 bg-[#7a6236] text-white rounded-lg shadow-md">
          {feedbackMessage}
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          {filteredProducts.map(product => (
            <div 
              key={product._id} 
              className={`flex items-center justify-between p-4 w-full border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                product.inPantry ? 'bg-[#f3e5d3]' : 'bg-[#ffffff]'
              }`}
              style={{ fontFamily: "'Cursive', sans-serif", letterSpacing: '0.5px' }}
            >
              <span className="font-semibold text-lg text-[#7a6236]">{product.product_name}</span>
              <div className="flex gap-3">
               
                <button
                  className="hover:text-[#d8b380] transition duration-300"
                  onClick={() => showDeleteConfirmation(product._id)}
                >
                  <RiDeleteBin5Line className='text-xl text-[#7a6236]' />
                </button>
                <button
                  className={`transition duration-300 ${product.inShoppingList ? 'text-[#d8b380]' : 'text-[#7a6236]'} hover:text-[#d8b380]`}
                  onClick={() => handleShoppingListClick(product._id)}
                  disabled={loading}
                >
                  {loading ? 'Moving...' : <FaCartShopping className="text-xl" />}
                </button>
                <button
                  className={`transition duration-300 ${product.inPantry ? 'text-[#d8b380]' : 'text-[#7a6236]'} hover:text-[#d8b380]`}
                  onClick={() => handleProductClick(product._id)}
                >
                  <MdOutlineKitchen className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#7a6236] text-lg mt-4" style={{ fontFamily: "'Cursive', sans-serif" }}>
          אין מוצרים זמינים בקטגוריה {category}
        </p>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#f5eadb] bg-opacity-90">
          <div className="bg-[#fff7e5] p-6 rounded-lg shadow-2xl text-center max-w-sm w-full transform transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-bold text-[#391e0f] mb-4" style={{ fontFamily: "'Cursive', sans-serif" }}>
              האם אתה בטוח?
            </h2>
            <p className="text-lg font-medium text-[#391e0f] mb-6">האם ברצונך למחוק את המוצר?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-[#7a6236] text-white px-6 py-2 rounded-full hover:bg-[#6b562a] shadow-md transition duration-200 transform hover:scale-105"
                onClick={handleDeleteProduct}
              >
                מחק
              </button>
              <button
                className="bg-[#e2c7a1] text-[#391e0f] px-6 py-2 rounded-full hover:bg-[#d8b380] shadow-md transition duration-200 transform hover:scale-105"
                onClick={cancelDelete}
              >
                בטל
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CategoryProducts;
