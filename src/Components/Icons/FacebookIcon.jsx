import React from "react";

const FacebookIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      className={className}
    >
      <g>
        <path d="M50,25.1C50,11.2,38.8,0,25,0S0,11.2,0,25.1s8.1,21.6,19,24.4v-16.7h-5.2v-7.7h5.2v-3.3c0-8.5,3.8-12.5,12.2-12.5s4.3.3,5.4.6v6.9c-.6,0-1.6,0-2.9,0-4.1,0-5.7,1.6-5.7,5.6v2.7h8.2l-1.4,7.7h-6.8v17.2c12.4-1.5,22-12.1,22-24.9h0Z" />
      </g>
    </svg>
  );
};
export default FacebookIcon;