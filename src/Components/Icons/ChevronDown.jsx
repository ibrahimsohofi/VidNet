import React from "react";

const ChevronDown = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 50 30"
      className={className}
    >
      <g>
        <g>
          <path d="M22.5,28.9c1.4,1.5,3.7,1.5,5.1,0L49,6.4c1.4-1.5,1.4-3.8,0-5.3s-3.7-1.5-5.1,0l-18.9,19.8L6.1,1.2c-1.4-1.5-3.7-1.5-5.1,0s-1.4,3.8,0,5.3l21.4,22.4h0Z" />
        </g>
      </g>
    </svg>
  );
};

export default ChevronDown;
