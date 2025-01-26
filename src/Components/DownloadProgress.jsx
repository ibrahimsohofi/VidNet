import React, { useState,useEffect } from "react";

function DownloadProgress({ progress, handleCancel}) {
    const [status,setStatus]=useState("")
    useEffect(() => {
        if (progress < 100) {
          setStatus("Downloading...");
        } else {
          setStatus("Converting...");
        }
      }, [progress]);
  return (
    <div className="fixed w-full flex items-center justify-center z-50 bg-gray-800  bg-opacity-40 p-3 h-full top-0 inset-0">
      <div
        className=" gap-3 bg-white border-gray-400 border flex flex-col justify-center   font-bold  
        text-2xl font-sans relative text-center rounded-lg p-5 h-fit w-full  transform scale-95 transition-all "
        role="alert"
      >
        <p className="text-gray-700">{status}</p>
        <div className={`h-7 flex  items-center border w-full  bg-gray-50 rounded-lg`}>
          <div
            className={`h-full rounded-l-lg ${ progress < 20? "bg-red-600": progress<40?"bg-red-500":progress < 60 ? "bg-orange-500": progress < 70 ? "bg-yellow-500" : "bg-green-500"
            }  flex items-center justify-center text-gray-50 ${progress==100 ? "rounded-r-lg":"rounded-r-none"} `}
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        <div className="flex gap-3 w-full  justify-end">
          <button className="w-fit bg-orange-600 text-white rounded-lg py-2 px-3 text-lg">
            Save file
          </button>
          <button
            className="w-fit border-orange-600 border-2 text-orange-600 hover:text-white hover:bg-orange-600 rounded-lg py-2 px-3 text-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadProgress;
