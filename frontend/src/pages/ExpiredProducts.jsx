import React, { useState,useEffect } from 'react';
import axios from 'axios';


const ExpiredProducts = () => {

  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/products/expired")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 //להשתמש הקומפוונטה של מוצר בהצגה פה
  return (
    <div className="App">
      <h1 className='text-red font-bold'>מוצרים שפג תוקפם</h1>
   
      {products && products.length > 0 ? (
        <ul>
            
          {products.map((product) => (
            <li key={product._id}>
              {product.product_name}  - {new Date(product.expiryDate).toLocaleDateString()}
           <img  src= {product.image}/>
            </li>
          ))}
        </ul>
      ) : (
        <p>לא נמצא מוצר</p>
      )}
    </div>
  );
  

  
}

  

export default ExpiredProducts