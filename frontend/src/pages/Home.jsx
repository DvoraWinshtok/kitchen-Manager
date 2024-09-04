// import React, { useEffect, useState } from "react";

// import { Link, Route, Routes } from "react-router-dom";
// import { AiFillPlusSquare } from "react-icons/ai";
// import Products from "./products";
// import { TbShoppingCart } from "react-icons/tb";
// import RecipeFilter from "./RecipeFinder";
// import Pantry from "./Pantry";

// const Home = () => {

//   return (

// <div>

//       <Link to="/recipes">
//         <button className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 border-b-4 border-gray-900 hover:border-gray-500 rounded">
//           <p>מתכונים </p>
//         </button>
//       </Link>
//       <Link to="/products">
//         <button className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 border-b-4 border-gray-900 hover:border-gray-500 rounded">
//           <p>למוצרים </p>
//         </button>
//       </Link>

//       <Link to="/shoppingList">
//       <img src="/iconShoppingList.png" alt="iconShoppingList" className="h-10	" />
//       </Link>
//       <Link to="/pantry">
//       <img src="/pantry.png" alt="iconPantry" className="h-20	" />
//       </Link>
//       <Link to="/recipeFilter">
//       <p>מתכונים שיש במטבח</p>
//       </Link>
// </div>  );
// };

// export default Home;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Nuvbar } from "../component/Frame38763";

// const Home = () => {
//   return (
//     <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden">
//       {/* Background and design elements */}
//       <img
//         className="rounded-br-[43px] rounded-bl-[43px] w-[1651px] h-[927px] absolute left-[1689px] top-36"
//         style={{
//           transformOrigin: "0 0",
//           transform: "rotate(0deg) scale(-1, 1)",
//           objectFit: "cover",
//         }}
//         src="/images/rectangle-6013.png"
//         alt="Background"
//       />
//       <div
//         className="rounded-bl-[43px] w-[927px] h-[1303px] absolute left-[386px] top-[1072px]"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%,rgba(0, 0, 0, 1.00) 100%)",
//           transformOrigin: "0 0",
//           transform: "rotate(-90deg) scale(1, 1)",
//           mixBlendMode: "multiply",
//         }}
//       ></div>
//       <div className="w-[279px] h-[78px] absolute left-[870px] top-[668px]">
//         <div className="bg-[#f9f7f4] rounded-[14px] w-[279px] h-[68px] absolute left-[calc(50%_-_139.5px)] top-0"></div>
//         <div
//           className="text-[#455411] text-center font-['PloniRoundAaa-Regular',_sans-serif] text-4xl font-normal absolute left-[calc(50%_-_139.5px)] top-[-1px] w-[279px] h-14"
//           style={{ letterSpacing: "9px" }}
//         >
//           <Link to="/recipes">למתכונים</Link>
//         </div>
//       </div>
//       <div className="text-[#ffffff] text-left font-['PlaceboFm-Bold',_sans-serif] text-9xl font-bold absolute left-[867px] top-[371px] w-[713px] h-[295px]">
//         איזה מתכון
//         <br />
//         נכין היום?{" "}
//       </div>

//       {/* Navigation links */}
//       <div className="absolute top-0 left-0 p-4"></div>

//       {/* Additional frame component */}
//       <Nuvbar className="!w-[1534px] !absolute !left-[97px] !top-[71px]" />
//     </div>
//   );
// };

// export default Home;
// import { Nuvbar } from "../component/Frame38763";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden flex flex-col items-center justify-start">
//       {/* Additional frame component */}
//       <Nuvbar className="w-full max-w-4xl mt-6" />

//       {/* Container for centered image and text */}
//       <div className="relative w-full max-w-4xl mt-10 mx-4">
//         {/* Image with small margins */}
//         <img
//           className="rounded-lg object-cover w-full h-auto"
//           src="/images/rectangle-6013.png"
//           alt="Background"
//         />

//         {/* Text and link positioned inside the image */}
//         <div className="absolute top-1/4 right-4 flex flex-col items-end space-y-4">
//           <div className="bg-[#f9f7f4] rounded-lg px-4 py-2">
//             <Link
//               to="/recipes"
//               className="text-[#455411] font-['PloniRoundAaa-Regular',_sans-serif] text-2xl tracking-wider"
//             >
//               למתכונים
//             </Link>
//           </div>
//           <div className="text-[#ffffff] font-['PlaceboFm-Bold',_sans-serif] text-4xl font-bold">
//             איזה מתכון
//             <br />
//             נכין היום?
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Home;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Nuvbar } from "../component/Frame38763";

// const Home = () => {
//   return (
//     <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden">
//       {/* רכיב הניווט */}
//       <Nuvbar />

//       {/* תמונה כרקע שמתחילה 3 סנטימטרים מתחת לחלק העליון של המסך */}
//       <img
//         className="absolute left-0 w-full h-[calc(100%-3cm)] object-cover"
//         style={{ top: '3cm' }}
//         src="/images/rectangle-6013.png"
//         alt="Background"
//       />

//       {/* אלמנט עם גרדיאנט לתמונה */}
//       <div
//         className="absolute left-0 w-full h-[calc(100%-3cm)]"
//         style={{
//           top: '3cm',
//           background:
//             "linear-gradient(to bottom, rgba(255, 255, 255, 0.00) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%)",
//           mixBlendMode: "multiply",
//         }}
//       ></div>

//       {/* כפתור "למתכונים" */}
//       <div className="w-[279px] h-[78px] absolute left-[1000px] top-[668px]">
//         <div className="bg-[#f9f7f4] rounded-[14px] w-[279px] h-[68px] absolute left-[calc(50%_-_139.5px)] top-0"></div>
//         <div
//           className="text-[#455411] text-center font-['PloniRoundAaa-Regular',_sans-serif] text-4xl font-normal absolute left-[calc(50%_-_139.5px)] top-[-1px] w-[279px] h-14"
//           style={{ letterSpacing: "9px" }}
//         >
//           <Link to="/recipes">למתכונים</Link>
//         </div>
//       </div>

//       {/* כיתוב "איזה מתכון נכין היום?" על התמונה */}
//       <div className="text-[#ffffff] text-left font-['PlaceboFm-Bold',_sans-serif] text-9xl font-bold absolute ">
//         איזה מתכון
//         <br />
//         נכין היום?
//       </div>
//     </div>
//   );
// };

// // export default Home;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Nuvbar } from "../component/Frame38763";

// const Home = () => {
//   return (
//     <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden">
//       {/* רכיב הניווט */}
//       <Nuvbar />

//       {/* תמונה כרקע שמתחילה מיד מתחת לניווט */}
//       <div className="relative w-full h-[60vh] mt-[3rem]"> {/* הקטנת הגובה של התמונה */}
//         <img
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           src="/images/rectangle-6013.png"
//           alt="Background"
//         />

//         {/* אלמנט עם גרדיאנט לתמונה */}
//         <div
//           className="absolute top-0 left-0 w-full h-full"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(255, 255, 255, 0.00) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%)",
//             mixBlendMode: "multiply",
//           }}
//         ></div>

//         {/* כיתוב "איזה מתכון נכין היום?" על התמונה, בצד ימין למעלה */}
//         <div className="absolute top-10 right-10 text-right text-[#ffffff] font-['PlaceboFm-Bold',_sans-serif] text-8xl font-bold drop-shadow-lg">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-yellow-300 to-red-400">
//             איזה מתכון
//           </span>
//           <br />
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-300 to-green-300">
//             נכין היום?
//           </span>
//         </div>
//       </div>

//       {/* כפתור "למתכונים" */}
//       <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2">
//         <Link to="/recipes">
//           <button className="bg-[#f9f7f4] text-[#455411] rounded-[14px] px-8 py-4 text-4xl font-['PloniRoundAaa-Regular',_sans-serif] font-normal tracking-wide shadow-lg hover:shadow-2xl transition duration-300">
//             למתכונים
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// // export default Home;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Nuvbar } from "../component/Frame38763";

// const Home = () => {
//   return (
//     <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden">
//       {/* רכיב הניווט */}
//       <Nuvbar />

//       {/* תמונה כרקע שמתחילה מיד מתחת לניווט */}
//       <div className="relative w-full h-[70vh] mt-[3rem]"> {/* הגדלתי את הגובה של התמונה */}
//         <img
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           src="/images/back1.jpg"
//           alt="Background"
//         />

//         {/* אלמנט עם גרדיאנט לתמונה */}
//         <div
//           className="absolute top-0 left-0 w-full h-full"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(255, 255, 255, 0.00) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%)",
//             mixBlendMode: "multiply",
//           }}
//         ></div>

//         {/* כיתוב "איזה מתכון נכין היום?" על התמונה, בצד ימין למעלה */}
//         <div className="absolute top-10 right-10 text-right text-[#ffffff] font-['PlaceboFm-Bold',_sans-serif] text-8xl font-bold drop-shadow-[2px_2px_6px_rgba(0,0,0,0.6)]">
//           <span className="bg-clip-text text-transparent">
//             איזה מתכון
//           </span>
//           <br />
//           <span className="bg-clip-text text-transparent">
//             נכין היום?
//           </span>
//         </div>
//       </div>

//       {/* כפתור "למתכונים" */}
//       <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2">
//         <Link to="/recipes">
//           <button className="bg-[#f9f7f4] text-[#455411] rounded-[14px] px-8 py-4 text-4xl font-['PloniRoundAaa-Regular',_sans-serif] font-normal tracking-wide shadow-lg hover:shadow-2xl transition duration-300">
//             למתכונים
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Link } from "react-router-dom";
import { Nuvbar } from "../component/Frame38763";

const Home = () => {
  return (
    <div className="bg-[#f5eadb] min-h-screen relative overflow-hidden">
      {/* רכיב הניווט */}
      <Nuvbar />

      {/* דיב שמכסה את כל המסך עם התמונה כרקע */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/images/back1.jpg"
          alt="Background"
        />

        {/* אלמנט עם גרדיאנט לתמונה */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.00) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%)",
            mixBlendMode: "multiply",
          }}
        ></div>

        {/* כיתוב "איזה מתכון נכין היום?" במרכז הדף */}
        <div className="relative text-center text-[#f5eadb] font-['PlaceboFm-Bold',_sans-serif] text-9xl font-bold drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)] mb-8">
          <span>איזה מתכון</span>
          <br />
          <span>?נכין היום</span>
        </div>

        {/* כפתור "למתכונים" מתחת לכיתוב */}
        <div className="relative">
          <Link to="/recipes">
            <button className="bg-[#f5eadb] text-[#7a6236] rounded-full px-8 py-4 text-3xl font-['PloniRoundAaa-Regular',_sans-serif] font-medium tracking-wide shadow-lg hover:bg-[#e0d5c0] hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              למתכונים
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
