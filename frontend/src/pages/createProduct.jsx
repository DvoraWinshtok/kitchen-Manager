
// import React, { useState } from 'react';

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateProduct = ({ isVisible, onClose }) => {
//   const [product_name, setProduct_name] = useState('');
//   const [category, setCategory] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false); // מצב להודעת הצלחה

//   const navigate = useNavigate();

//   const categories = [
//     "מוצרי חלב",
//     "פירות וירקות",
//     "דגנים וקטניות",
//     "חד פעמי",
//     "מוצרי בסיס",
//     "חטיפים וממתקים",
//     "משקאות",
//     "שימורים ומזון יבש",
//     "תבלינים ורטבים",
//     "אפיה",
//     "דגים ובשר"
//   ];

//   const handleSaveProduct = () => {
//     if (!product_name || !category) {
//       alert('יש למלא את כל השדות הנדרשים.');
//       return;
//     }

//     const data = {
//       product_name,
//       category,
//     };

//     setLoading(true);
//     axios
//       .post("http://localhost:5000/products", data)
//       .then(() => {
//         setLoading(false);
//         setShowSuccessMessage(true); // הצגת הודעת הצלחה
//         setTimeout(() => {
//           setShowSuccessMessage(false); // הסתרת הודעת הצלחה אחרי 3 שניות
//           onClose(); // סגירת הטופס לאחר שמירת המוצר
//           navigate("/products");
//         }, 3000);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.log(error);
//       });
//   };

//   if (!isVisible) {
//     return null; // אם isVisible הוא false, לא מציגים את הטופס
//   }

//   return (
//     <div className="mt-4 p-6 bg-[#f5eadb] rounded-lg shadow-lg relative">
//       <button className="absolute top-2 right-2 text-[#7a6236] hover:text-[#5e4b2f]" onClick={onClose}>
//         &times;
//       </button>
//       <h1 className="text-3xl my-4 text-center text-[#7a6236]">הוסף מוצר חדש</h1>
      
//       {/* הודעת הצלחה בצבע חום */}
//       {showSuccessMessage && (
//         <div className="fixed top-4 right-4 bg-[#7a6236] text-white px-4 py-2 rounded-md shadow-lg">
//           המוצר נוסף בהצלחה!
//         </div>
//       )}

//       <div className='flex flex-col'>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-[#7a6236]'>שם המוצר</label>
//           <input
//             type='text'
//             value={product_name}
//             onChange={(e) => setProduct_name(e.target.value)}
//             className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-[#7a6236]'>קטגוריה</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md bg-white text-[#7a6236]'
//           >
//             <option value=''>בחר קטגוריה</option>
//             {categories.map((cat, index) => (
//               <option key={index} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//         <button
//           className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
//           onClick={handleSaveProduct}
//         >
//           שמור
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = ({ isVisible, onClose }) => {
  const [product_name, setProduct_name] = useState(''); // שמירה של שם המוצר
  const [category, setCategory] = useState(''); // שמירה של קטגוריית המוצר
  const [loading, setLoading] = useState(false); // שמירה של מצב הטעינה
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // שמירה של מצב הודעת ההצלחה

  const navigate = useNavigate();

  // רשימת הקטגוריות לבחירה
  const categories = [
    "מוצרי חלב",
    "פירות וירקות",
    "דגנים וקטניות",
    "חד פעמי",
    "מוצרי בסיס",
    "חטיפים וממתקים",
    "משקאות",
    "שימורים ומזון יבש",
    "תבלינים ורטבים",
    "אפיה",
    "דגים ובשר"
  ];

  const handleSaveProduct = () => {
    // בדיקה אם כל השדות הנדרשים מלאים
    if (!product_name || !category) {
      alert('יש למלא את כל השדות הנדרשים.');
      return;
    }

    const data = {
      product_name,
      category,
    };

    setLoading(true); // התחלת מצב טעינה
    axios
      .post("http://localhost:5000/products", data)
      .then(() => {
        setLoading(false); // סיום מצב טעינה
        setShowSuccessMessage(true); // הצגת הודעת הצלחה
        setTimeout(() => {
          setShowSuccessMessage(false); // הסתרת הודעת הצלחה אחרי 3 שניות
          onClose(); // סגירת הטופס לאחר שמירת המוצר
          navigate("/products"); // ניווט לעמוד המוצרים
        }, 3000);
      })
      .catch((error) => {
        setLoading(false); // סיום מצב טעינה במקרה של שגיאה
        console.log(error);
      });
  };

  // אם isVisible הוא false, לא מציגים את הטופס
  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-4 p-6 bg-[#f5eadb] rounded-lg shadow-lg relative">
      <button className="absolute top-2 right-2 text-[#7a6236] hover:text-[#5e4b2f]" onClick={onClose}>
        &times;
      </button>
      <h1 className="text-3xl my-4 text-center text-[#7a6236]">הוסף מוצר חדש</h1>
      
      {/* הודעת הצלחה בצבע חום */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-[#7a6236] text-white px-4 py-2 rounded-md shadow-lg">
          המוצר נוסף בהצלחה!
        </div>
      )}

      <div className='flex flex-col'>
        {/* שדה להזנת שם המוצר */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-[#7a6236]'>שם המוצר</label>
          <input
            type='text'
            value={product_name}
            onChange={(e) => setProduct_name(e.target.value)}
            className='border-2 border-[#7a6236] px-4 py-2 w-full rounded-md'
          />
        </div>

        {/* שדה לבחירת קטגוריה */}
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

        {/* כפתור שמירה */}
        <button
          className='p-2 bg-[#7a6236] text-white rounded mt-4 mx-auto w-full'
          onClick={handleSaveProduct}
        >
          שמור
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
