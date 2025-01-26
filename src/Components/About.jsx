import React from "react";

function AboutUs() {
  return (
    <article className="w-full   mx-auto bg-gray-50  flex flex-col justify-center items-center ">
      <section className="gap-4 flex border-b flex-col border-gray-300 bg-gray-100 p-10 h-[30rem] w-full justify-center  items-center">
        <h1 className="text-orange-500 font-bold font-Montserrat text-5xl">
        <span className="text-gray-900 font-semibold"> Welcome to</span> VidNet


       </h1>
        <p className="text-gray-700 text-xl text-center  w-7/12"> The fastest and most reliable way to download YouTube videos. Start your journey with us today!</p>
        <button className="bg-orange-500 p-3 text-xl rounded-lg text-white">Start Downloading Now</button>
      </section>
      {/* <hr className="border-gray-400 w-2/3 mx-auto " /> */}
      <section className=" h-[30rem] w-full flex items-center justify-center bg-gray-0 ">
        <h1 className="text-5xl font-bold text-orange-600 font-Montserrat"><span className="text-gray-800 font-semibold">Why </span> VidNet?</h1>

      </section>
      
      
    </article>
  );
}

export default AboutUs;
