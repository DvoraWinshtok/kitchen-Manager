// import React from "react";
// import { Link } from "react-router-dom"; // תייבא את ה-Link למעלה
// <style>
// @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
// </style>
// export const Nuvbar = ({ className, ...props }) => {
//   return (
    
//     <div className={"h-[39px] relative " + className}>
//       <div className="w-[111px] h-[39px] absolute left-[1423px] top-0">
//         <div className="text-[#391e0f] text-left font-['AnomaliaMlV2Aaa-Regular',_sans-serif] text-3xl leading-[56px] font-normal absolute right-[-18.02%] left-[0%] w-[118.02%] bottom-[41.03%] top-[0%] h-[58.97%] flex items-center justify-start">
//           kitchen{" "}
//         </div>
//         <div className="text-[#391e0f] text-left font-['Sacramento-Regular',_sans-serif] text-[40px] leading-[56px] font-normal absolute right-[3.6%] left-[0.9%] w-[95.5%] bottom-[0%] top-[56.41%] h-[43.59%] flex items-center justify-start">
//           manager{" "}
//         </div>
//       </div>
//       <div className="w-[374px] h-[30px] absolute left-0 top-px">
//         <div className="w-14 h-[30px] absolute left-[239px] top-0">
//           <Link to="/products" className="text-[#391e0f] text-left font-['PloniRoundAaa-Regular',_sans-serif] text-xl font-normal absolute right-[0%] left-[0%] w-[100%] bottom-[0%] top-[0%] h-[100%]">
//             מוצרים
//           </Link>
//         </div>
//         <div className="w-[43px] h-[30px] absolute left-[331px] top-0">
//           <Link to="/pantry" className="text-[#391e0f] text-left font-['PloniRoundAaa-Regular',_sans-serif] text-xl font-normal absolute right-[0%] left-[0%] w-[100%] bottom-[0%] top-[0%] h-[100%]">
//             מזווה
//           </Link>
//         </div>
//         <div className="w-[65px] h-[30px] absolute left-[138px] top-0">
//           <Link to="/recipes" className="text-[#391e0f] text-left font-['PloniRoundAaa-Regular',_sans-serif] text-xl font-normal absolute right-[0%] left-[0%] w-[100%] bottom-[0%] top-[0%] h-[100%]">
//             מתכונים
//           </Link>
//         </div>
//         <div className="w-[102px] h-[30px] absolute left-0 top-0">
//           <Link to="/shoppingList" className="text-[#391e0f] text-left font-['PloniRoundAaa-Regular',_sans-serif] text-xl font-normal absolute right-[0%] left-[0%] w-[100%] bottom-[0%] top-[0%] h-[100%]">
//             רשימת קניות
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React from "react";
// import { Link } from "react-router-dom";

// export const Nuvbar = ({ className, ...props }) => {
//   return (
//     <nav className={`flex items-center justify-between px-4 py-2 w-full bg-[#f5e1d2] ${className}`}>
//       {/* אזור הקישורים לניווט */}
//       <div className="flex items-center space-x-6">
//         <Link to="/products" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
//           מוצרים
//         </Link>
//         <Link to="/pantry" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
//           מזווה
//         </Link>
//         <Link to="/recipes" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
//           מתכונים
//         </Link>
//         <Link to="/shoppingList" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
//           רשימת קניות
//         </Link>
//       </div>

//       {/* אזור הלוגו */}
//       <div className="relative flex flex-col items-end">
//         {/* כיתוב "kitchen" בגופן גדול ועבה יותר */}
//         <div className="text-4xl font-semibold text-[#391e0f]">
//           kitchen
//         </div>
//         {/* כיתוב "manager" בגופן מסולסל "Sacramento" ודק יותר */}
        
//         <div className="text-4xl font-[Sacramento] text-[#391e0f] relative -mt-1 font-normal">
//           manager
//         </div>
//       </div>
//     </nav>
//   );
// };
import React from "react";
import { Link } from "react-router-dom";

export const Nuvbar = ({ className, ...props }) => {
  return (
    <nav className={`flex items-center justify-between px-4 py-1.5 w-full bg-[#f5e1d2] ${className}`}>
      {/* אזור הקישורים לניווט */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
          דף הבית
        </Link>
        <Link to="/products" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
          מוצרים
        </Link>
        <Link to="/pantry" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
          מזווה
        </Link>
        <Link to="/recipes" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
          מתכונים
        </Link>
        <Link to="/shoppingList" className="text-[#391e0f] text-base font-['PloniRoundAaa-Regular',_sans-serif]">
          רשימת קניות
        </Link>
      </div>

      {/* אזור הלוגו */}
      <div className="relative flex flex-col items-end">
        {/* כיתוב "kitchen" בגופן גדול ועבה יותר עם קישור לדף הבית */}
        <Link to="/" className="text-3xl font-semibold text-[#391e0f]">
          kitchen
        </Link>
        {/* כיתוב "manager" בגופן מסולסל "Sacramento" ודק יותר עם קישור לדף הבית */}
        <Link to="/" className="text-3xl font-[Sacramento] text-[#391e0f] relative -mt-1 font-normal">
          manager
        </Link>
      </div>
    </nav>
  );
};
