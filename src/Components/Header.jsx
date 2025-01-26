import { useState, useEffect, useRef } from "react";
import Main from "./Main";
import DownloadCard from "./DownloadCard";
import HowToUse from "./HowToUse";
import Error from "./Error";
import DownloadCardSkeleton from "./DownloadCardSkeleton";
import Faqs from "./Faqs";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ error: "", isActive: false });
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadstatus] = useState(false);
  const scrollTo = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  function scrollToTop() {
    if (scrollTo.current) {
      scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  const handleActiveError = () => {
    setError({ ...error, isActive: false });
  };
  function handleDownload() {
    if (inputValue.trim() !== "") {
      scrollToTop();
      setLoading(true);
      setShowDownloadCard(true);
      setDownloadstatus(true);
      setError({ ...error, isActive: false });
    } else {
      setError({
        ...error,
        error: "Please enter a valid URL to proceed.",
        isActive: true,
      });
      setShowDownloadCard(false);
      setLoading(false);
      setDownloadstatus(true);
    }
  }
  useEffect(() => {
    if (showDownloadCard && inputValue) {
      const fetchData = async () => {
        try {
          const response = await fetch( `http://localhost:5000/video-info?url=${encodeURIComponent( inputValue)}`
          ); //http://localhost:5000/video-info?url=${encodeURIComponent(inputValue)}
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data: ${response.status} ${response.statusText}`
            );
          }
          const jsonData = await response.json();
          console.log("Fetched data:", jsonData);
          setVideoData(jsonData);
          setDownloadstatus(false);
          setLoading(false);
        } catch (err) {
          console.error("Fetch error:", err);
          setDownloadstatus(false);
          setError({ error: err.message, isActive: true });
          setShowDownloadCard(false);
        }
      };
      fetchData();
    }
  }, [downloadStatus, showDownloadCard, inputValue]);
  const videoInfo = videoData
    ? {
        videoTitle: videoData.title || "Unknown Title",
        videoDuration: videoData.duration || "Unknown Duration",
        videoThumbnail: videoData.thumbnail || "",
        videoUrl: videoData.videoUrl || videoData.url,
        author: videoData.author || "Unknown Author",
        authorThumbnail: videoData.authorImg || "",
        channelUrl: videoData.channelUrl || "",
      }
    : {};
  const videoOptions =
    videoData && Array.isArray(videoData.formats)
      ? videoData.formats.map((format) => ({
          formatId: format.formatId || "Unknown",
          resolution: format.resolution || "Unknown",
          fileSize: format.fileSize || "Unknown",
          videoQuality: format.videoQuality || "Unknown",
          audioQuality: format.audioBitrate || "Unknown",
          fileExtension: format.ext || "Unknown",
          fileUrl: format.url || "",
          videoUrl: inputValue,
        }))
      : [];
  const handlePasteClipboard = async () => {
    try {
      const link = await navigator.clipboard.readText();
      setInputValue(link);
      setDownloadstatus(true);
    } catch (error) {
      setError("Failed to read clipboard contents:", error);
    }
  };
  useEffect(() => {
    if (downloadStatus && inputValue.trim() !== "") {
      handleDownload();
      setDownloadstatus(false);
    }
  }, [inputValue, downloadStatus]);
  return (
    <>
    
      <header className="w-full h-230 flex flex-col items-center justify-start  pt-3">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold">
            Download <span className="text-orange-500">Videos & Audio</span>{" "}
            Instantly
          </h1>
          <p className="text-lg opacity-90">
            Convert videos into your desired format in just a few clicks!
          </p>
        </div>
        <div
          className=" my-5 px-3 flex items-center justify-center w-3/5 gap-1 "
          ref={scrollTo}
        >
          <div className=" bg-gray-50 hover:bg-gray-200  w-20  h-16 border border-gray-300 rounded-lg mr-[-3px]">
            <button
              className="w-full h-full  flex items-center justify-center focus:outline-none"
              onClick={handlePasteClipboard}
            >
              <img
                className="h-10 w-10 hover:scale-105"
                src="./svg/clipboard-outline.svg "
                alt="Clipboard"
              />
            </button>
          </div>
          <input
            value={inputValue}
            id="scrollTo"
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleDownload();
              }
            }}
            aria-label="Download URL input"
            type="url"
            className="text-gray-950 text-lg outline-none font-bold rounded-md h-16  px-5 w-full border-gray-600 border-2"
            placeholder="Paste the video link here..."
          />
          <button
            onClick={handleDownload}
            className=" bg-gray-800 hover:bg-gray-950 text-white 
             font-semibold rounded-md h-16 w-40 px-5 text-3xl flex items-center justify-center "
          >
            Download
          </button>
        </div>
      </header>
      <main className="flex flex-col  items-center h-full w-full">
        
        {loading && <DownloadCardSkeleton />}
        <Main>
          {!inputValue && error.isActive ? (
            <Error error={error.error} activeError={handleActiveError} />
          ) : (
            <>
              {showDownloadCard && !loading && (
                <>
                
                  <DownloadCard
                    inputValue={inputValue}
                    videoInfo={videoInfo}
                    videoOpt={videoOptions}
                    audioOpt={videoOptions}
                  />
                </>
              )}
            </>
          )}
          <HowToUse />
          <Faqs />
        </Main>
      </main>
      {error.isActive ? (
        <Error error={error.error} activeError={handleActiveError} />
      ) : (
        <></>
      )}
    </>
  );
}
export default Header;