// import { useState, useEffect } from 'react';

// const Search = ({ products, onSearch }) => {
//   const [searchValue, setSearchValue] = useState('');

//   useEffect(() => {
//     onSearch(searchValue);
//   }, [searchValue, onSearch]);

//   return (
//     <div className="flex justify-center mb-4">
//       <input
//         type="text"
//         placeholder="🔍 Search..."
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         className="p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default Search;
/* import { useState, useEffect } from 'react';

const Search = ({ products, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue, onSearch]);

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="🔍 Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;
 */


// import React, { useState } from 'react';

// const Search = ({ onSearch }) => {
//   const [searchValue, setSearchValue] = useState('');

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     setSearchValue(newValue);
//     onSearch(newValue);
//   };

//   return (
//     <div className="flex justify-center mb-4">
//       <input
//         type="text"
//         placeholder=" Search..."
//         value={searchValue}
//         onChange={handleInputChange}
//         className="p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default Search;
import React, { useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  const handleBlur = (e) => {
    // נוודא שהפוקוס לא עובר לאלמנט אחר בתוך הקומפוננטה
    if (e.relatedTarget === null || !e.relatedTarget.className.includes('search-element')) {
      setIsSearchOpen(false);
      setSearchValue(''); // אופציונלי: ניקוי ערך החיפוש כאשר השדה נסגר
    }
  };

  const handleIconClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100); // מתזמן את הפוקוס כדי להבטיח שהשדה פתוח לפני כן
  };

  return (
    <div className="flex justify-center mb-4" tabIndex={-1} onBlur={handleBlur}>
      {isSearchOpen ? (
        <input
          type="text"
          ref={inputRef}
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="search-element p-2 border border-[#7a6236] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a6236]"
        />
      ) : (
        <button
          onClick={handleIconClick}
          className="search-element text-[#7a6236] text-2xl"
        >
          <AiOutlineSearch />
        </button>
      )}
    </div>
  );
};

export default Search;
