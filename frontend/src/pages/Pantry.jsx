
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillPlusSquare, AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Search from '../component/Search';
import useMoveProduct from '../component/useMoveProduct';
import { FaCartShopping } from "react-icons/fa6";
 import { Nuvbar } from '../component/Frame38763';
const Pantry = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { moveProductToShoppingList, loading } = useMoveProduct();

  // קטגוריות קבועות מראש
  const predefinedCategories = [
    { name: 'מוצרי חלב', icon: <img src='/images/milk.png' className="w-7 h-7" alt="מוצרי חלב" /> },
    { name: 'חטיפים וממתקים', icon: <img src='/images/snacks.png' className="w-7 h-7" alt="חטיפים וממתקים" /> },
    { name: 'משקאות', icon: <img src='/images/drinks.png' className="w-7 h-7" alt="משקאות" /> },
    { name: 'פירות וירקות', icon: <img src='/images/vegetables.png' className="w-7 h-7" alt="פירות וירקות" /> },
    { name: 'דגנים וקטניות', icon: <img src='/images/LegumesGrains.png' className="w-7 h-7" alt="דגנים וקטניות " /> },
    { name: 'שימורים ומזון יבש ', icon: <img src='/images/CannedDryFood.png' className="w-7 h-7" alt="דגנים וקטניות " /> },
    { name: 'אפיה', icon: <img src='/images/bakery.png' className="w-7 h-7" alt="אפיה" /> },
    { name: 'תבלינים ורטבים', icon: <img src='/images/spices.png' className="w-7 h-7" alt="תבלינים ורטבים" /> },
    { name: 'חד פעמי', icon: <img src='/images/disposable.png' className="w-7 h-7" alt=" חד פעמי" /> },
    { name: 'בשר ודגים', icon: <img src='/images/meat.png' className="w-7 h-7" alt="בשר ודגים" /> },
    { name: 'מוצרי בסיס', icon: <img src='/images/basic.png' className="w-7 h-7" alt="מוצרי בסיס" /> },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/products/pantry")
      .then(response => {
        const data = response.data.data.map(product => ({
          ...product,
          product_name: product.product_name.trim(),
          category: product.category.trim().toLowerCase()
        }));
        
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = searchValue => {
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category.toLowerCase()));
    }
  };

  return (
    <div> <Nuvbar/>
    <div className="bg-[#f5eadb] min-h-screen p-6"> {/* הקטנת הפדינג */}
    <div className="flex justify-start mt-6"> {/* הקטנת המרווחים */}
   <Search onSearch={handleSearch} />
        {/* <Link to="/products/createProduct" className="flex items-center bg-[#e6d3bc] text-[#7a6236] rounded-lg shadow-sm hover:bg-[#dbc7a9] transition duration-300 p-3"> {/* הקטנת הפדינג והצללים */}

      </div>
      <h1 className="text-4xl font-bold text-[#7a6236] mb-4 text-center">המזווה שלי 
   
 </h1> {/* הקטנת גודל הטקסט והמרווחים */}


      {/* כפתורי קטגוריות מעוצבים */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> {/* הקטנת הרווחים */}
        {predefinedCategories.map((category, index) => (
          <div key={index} className="bg-[#e6d3bc] p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center"> {/* הקטנת הפדינג והצללים */}
            <button onClick={() => handleCategoryClick(category.name)} className="flex flex-col items-center">
              {category.icon}
              <span className="text-[#7a6236] text-sm font-medium mt-1">{category.name}</span> {/* הקטנת גודל הטקסט */}
            </button>
          </div>
        ))}
      </div>

      {/* הצגת מוצרים תחת כל קטגוריה נבחרת */}
      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-bold text-[#7a6236] mb-3">{selectedCategory}</h2> {/* הקטנת גודל הטקסט */}
          <div className="flex flex-col gap-3"> {/* הקטנת הרווחים */}
            {filteredProducts.map(product => (
              <div key={product._id} className="p-3 bg-[#f5f1e5] rounded-lg shadow-sm flex justify-between items-center"> {/* הקטנת הפדינג והצללים */}
                <span className="text-lg font-medium">{product.product_name}</span> {/* הקטנת גודל הטקסט */}
                <div className='flex gap-x-3'> {/* הקטנת הרווחים */}
                  <Link to={`/products/editProduct/${product._id}`}>
                    <AiTwotoneEdit className='text-xl text-red-600' /> {/* הקטנת האייקון */}
                  </Link>
                  <Link to={`/products/deleteProduct/${product._id}`}>
                    <RiDeleteBin5Line className='text-xl text-green-600' /> {/* הקטנת האייקון */}
                  </Link>
                  <button className='text-xl text-black-600' onClick={() => moveProductToShoppingList(product._id)} disabled={loading}>
                    <FaCartShopping />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* כפתור להוספת מוצר */}
      
    </div>
    </div>
  );
};

export default Pantry;
