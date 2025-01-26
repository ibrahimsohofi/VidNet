function DownloadCardSkeleton() {
  return (
    <div aria-hidden="true"  role="status" aria-live="polite" className=" flex-row m-auto bg-white flex justify-between h-[440px]
      p-4 border w-[98%] rounded-lg  border-b border-gray-300  mb-3 animate-pulse">
      <div className="w-[45%] h-full flex gap-2 flex-col  ">
        <div className="bg-gray-400 h-3/4 rounded-lg "></div>
        <div className=" h-2/6  gap-3 flex flex-col w-11/12">
          <div className="bg-gray-400 h-7 rounded-md "></div>
          <div className=" h-12 rounded-lg flex items-center  gap-4">
            <div className="h-14 w-14 bg-gray-400 rounded-full"></div>
            <div className="h-6 w-5/6 bg-gray-400 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className=" w-4/6 h-full  px-4 gap-2 flex flex-col ">
        <div className="h-14 w-1/2 bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-8  w-full bg-gray-400 rounded-md"></div>
        <div className="h-10  w-3/5 bg-gray-400 rounded-md mx-auto"></div>
      </div>
    </div>
  );
}
export default DownloadCardSkeleton;