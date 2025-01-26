import React, { useState } from "react";

function Error({ error, activeError }) {
  console.log(error,activeError);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed w-full flex items-center justify-center z-50 bg-gray-800  bg-opacity-40 p-3 h-full top-0 inset-0">
      <div
        className="  bg-white border-gray-400 border flex flex-col justify-center items-center  font-bold  
        text-2xl font-sans relative text-center rounded-lg p-5 w-5/12 h-fit  transform scale-95 transition-all hover:scale-100"
        role="alert"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error:</h1>
        <p className=" text-gray-700 text-xl mb-4"> {error} </p>

        <button
          title="Close"
          className="hover:scale-110 absolute flex justify-center items-center w-7 h-7 top-2 right-2 z-50  focus:outline-none "
        >
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={activeError}
            className="w-6 h-6"
            src={
              isHovered
                ? "./svg/close-square-bold-cercle.svg"
                : "./svg/close-square-outline-cercle.svg"
            }
            alt="Close"
          />
        </button>
      </div>
    </div>
  );
}
export default Error;
