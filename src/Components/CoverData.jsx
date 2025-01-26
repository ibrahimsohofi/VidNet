function HandleCoverInfo({ videoInfo }) {
  return (
    <div className="py-1 pr-1 h-full  w-full flex flex-col justify-center items-start ">
      <div className="flex flex-col w-full h-full items-center gap-1 py-1 ">
        <img className=" w-8/12  rounded-md" src={videoInfo.videoThumbnail} alt="" />
        <a
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-md bg-gray-800 text-white text-2xl p-2 w-8/12 font-bold text-center "
          href={videoInfo.videoThumbnail}
          download
        >
          <button className=" outline-none">Download</button>
        </a>
      </div>
    </div>
  );
}
export default HandleCoverInfo;
