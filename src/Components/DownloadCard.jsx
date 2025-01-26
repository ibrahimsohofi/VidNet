import { useRef, useState } from "react";
import HandleCoverInfo from "./CoverData";
import HandleVideoInfo from "./VideoData";
import HandleAudioInfo from "./AudioData";
import DownloadProgress from "./DownloadProgress";
function DownloadCard({ videoInfo, videoOpt, audioOpt ,inputValue}) {
  const [activeOption, setActiveOption] = useState("video");
  const [ControlBtn, setControlBtn] = useState("Play");
  const [isHovered, setIsHovered] = useState(false);

  function handleShowOption(option) {
    setActiveOption(option);
  }
  function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let rest_h = seconds % 3600;
    let m = Math.floor(rest_h / 60);
    let rest_m = rest_h % 60;
    let s = rest_m;
    return (
      h.toString().padStart(2, "0") +
      "h:" +
      m.toString().padStart(2, "0") +
      "m:" +
      s.toString().padStart(2, "0") +
      "s"
    );
  }
  const videoRef = useRef(null);
  const handlePlay = () => {
    videoRef.current.play();
    setControlBtn("Pause");
  };
  const HandlePause = () => {
    videoRef.current.pause();
    setControlBtn("Play");
  };

  return (
    <section className="bg-white flex justify-between  relative p-3 border w-[98%] rounded-lg">
   
      <article className="vid-info w-2/5 flex items-start ">
        <div className=" border rounded-lg border-gray-400 p-2 ">
          <div
            className="relative flex items-center  justify-center "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <video
              className="w-full h-full  rounded-xl "
              poster={videoInfo.videoThumbnail}
              src={videoInfo.videoUrl}
              controls
              
              ref={videoRef}
            ></video>
            {isHovered && (
              <button
                className=" opacity-50 hover:opacity-100 absolute bg-white w-10 h-10 rounded-full  flex items-center justify-center focus:outline-none "
                onClick={ControlBtn === "Play" ? handlePlay : HandlePause}
              >
                <img
                  className="w-10 h-10"
                  src={
                    ControlBtn === "Play" ? "./svg/play.svg" : "./svg/pause.svg"
                  }
                  alt=""
                />
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between items-start mt-[0.2rem] py-1 rounded-lg border border-gray-400">
            <h2 className="w-full h-full font-bold text-[1rem] flex p-2 text-gray-800">
              {videoInfo.videoTitle}
            </h2>
            <div className="flex items-center w-full justify-between pr-6">
              <a
                href={videoInfo.channelUrl}
                className="author-info px-2 flex items-center gap-2 "
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="rounded-full w-14 h-14 "
                  src={videoInfo.authorThumbnail}
                  alt=""
                />
                <h2 className="font-[790] text-lg text-gray-800">
                  {videoInfo.author}
                </h2>
              </a>
              <div className="px-2 flex items-center gap-1">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  aria-labelledby="svgTitle"
                >
                  <g>
                    <path
                      fill="#1f2937"
                      d="M32,0A32,32,0,1,0,64,32,32,32,0,0,0,32,0Zm0,58.67A26.67,26.67,0,1,1,58.67,32,26.72,26.72,0,0,1,32,58.67Z"
                    />
                    <path
                      fill="#1f2937"
                      d="M43.55,34.67l-7.1-5.34L34.67,28V13.33a2.67,2.67,0,0,0-5.34,0v16a2.64,2.64,0,0,0,.08.62,2.25,2.25,0,0,0,.22.56,1.66,1.66,0,0,0,.29.48s0,.08.08.1a2.44,2.44,0,0,0,.37.35l0,0,.11.08,4.16,3.12,6.4,4.8a2.59,2.59,0,0,0,1.6.53,2.67,2.67,0,0,0,1.6-4.8Z"
                    />
                  </g>
                </svg>
                <h1 className="font-bold text-gray-800">
                  {formatTime(parseInt(videoInfo.videoDuration))}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="dl-options w-[59.6%]  h-7/12 border-gray-400 border p-2 rounded-lg  ">
        {/* <div className="text-center w-full p-3 rounded-md ">
          <h1 className="text-2xl font-bold text-gray-950">
            Download Options:
          </h1>
        </div> */}
        <div className="flex w-full ">
          <div className=" items-center flex w-6/12 bg-gray-600 rounded-t-lg ">
            <button
              onClick={() => {
                handleShowOption("video");
              }}
              className={`${
                activeOption === "video"
                  ? "bg-gray-700 border-x-gray-500  border-t-gray-500 border-b-gray-500 border-b border-x-2 border-t-2"
                  : " bg-gray-500 border-b-gray-500 border-b-2"
              } focus:outline-none w-[33.4%] p-3 h-14  text-white font-bold text-lg rounded-ss-lg `}
            >
              Video
            </button>
            <button
              onClick={() => {
                handleShowOption("audio");
              }}
              className={`${
                activeOption === "audio"
                  ? "bg-gray-700 border-x-gray-500 border-t-gray-500 border-b-gray-500 border-b border-x-2 border-t-2"
                  : " bg-gray-500 border-b-gray-500 border-b-2"
              } focus:outline-none w-[33.4%] p-3 h-14  text-white font-bold text-lg`}
            >
              Audio
            </button>
            <button
              onClick={() => {
                handleShowOption("cover");
              }}
              className={`${
                activeOption === "cover"
                  ? "bg-gray-700 border-x-gray-500 border-t-gray-500 border-b-gray-500 border-b border-x-2 border-t-2"
                  : " bg-gray-500 border-b-gray-500  border-b-2"
              } focus:outline-none w-[33.4%] p-3 h-14  text-white font-bold text-lg rounded-se-lg box-border`}
            >
              Thumbnail
            </button>
          </div>
        </div>

        <div className="w-full videoOption  border-x-gray-500 border-b-gray-500 border-b-2 rounded-tr-lg rounded-b-lg border-x-2">
          {activeOption === "video" && <HandleVideoInfo videoOpt={videoOpt} videoInfo={videoInfo} inputValue={inputValue}/>}
          {activeOption === "audio" && <HandleAudioInfo audioOpt={audioOpt} />}
          {activeOption === "cover" && <HandleCoverInfo videoInfo={videoInfo} />}
        </div>
      </article>
      
    </section>
  );
}

export default DownloadCard;
