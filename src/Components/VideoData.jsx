import { useState } from "react";
import "./styles.css";
import DownloadProgress from "./DownloadProgress";

function HandleVideoInfo({ videoOpt, inputValue }) {
  const [itemsCount, setItemsCount] = useState(4);
  const [btnTitle, setBtnTitle] = useState("Load more video options");
  const [dlStatus, setDlStatus] = useState({
    progress:0,
    isDownloading:false
  });
const handleDownloadStatus=()=>{
  setDlStatus((prev)=>({...prev,isDownloading:false }))
}
  const handleDownload = async (
    videoQuality,
    isAudioActive,
    fileExtension,
    fileUrl
  ) => {
    try {
     setDlStatus({...dlStatus,progress:0,isDownloading:true})
     console.log("download started")
      const response = await fetch(
        `http://localhost:5000/download?quality=${videoQuality}&audio=${isAudioActive}&extension=${fileExtension}&url=${encodeURIComponent(
          fileUrl
        )}`,
        {
          method: "GET",
          cache: "no-cache"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start download");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let content = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        content += decoder.decode(value);
        const lines = content.split("\n");
        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.progress) {
                setDlStatus((prev)=>({...prev,progress:data.progress}))  
              }
              if (data.message === "Download completed") {
                setDlStatus({ progress: 100, isDownloading: false });
              }
              
            } catch (err) {
              console.error("Error parsing line:", line);
            }
          }
        });
        content = lines[lines.length - 1]; // Keep the last incomplete line (if any)
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while downloading the video.");
      setDlStatus({...dlStatus,progress:0,isDownloading:false})
    } 
  };

  return (
    <div className="w-full flex flex-col items-center">
      <table className="w-full text-center">
        <thead>
          <tr className="h-14 bg-gray-700">
            <th>Quality</th>
            <th>Size</th>
            <th>Format</th>
            <th className="rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {videoOpt
            ?.map((videoOption, index) => {
              return (
                <tr
                  className={` border-b-gray-300 border-b hover:bg-gray-300 ${
                    index === videoOpt.length - 1 ? "rounded-b-lg " : ""
                  }   ${index % 2 !== 0 ? "bg-white " : "bg-gray-200"}   `}
                  key={index}
                >
                  <td
                    className={`p-3   ${
                      index === videoOpt.length - 1 ? "rounded-bl-lg" : ""
                    }`}
                  >
                    {videoOption.videoQuality}
                  </td>
                  <td className=" p-3"> {videoOption.fileSize} </td>
                  <td className=" p-3">
                    <h2>{videoOption.fileExtension}</h2>
                  </td>
                  <td
                    className={`p-3   ${
                      index === videoOpt.length - 1 ? "rounded-br-lg" : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        handleDownload(1080, false, "mp4", inputValue);
                      }}
                      className={`h-8 bg-orange-600 text-white w-full rounded-[6px] flex items-center justify-center `}
                      key={`download-button-${index}`}
                    >
                      <img
                        src="./images/326639_download_file_icon.svg"
                        alt="download"
                      />
                    </button>
                  </td>
                </tr>
              );
            })
            .slice(0, itemsCount)}
        </tbody>
      </table>
      <button
        className="bg-gray-700 hover:bg-gray-800 rounded-[10px] w-9/12 p-2 font-bold text-2xl text-gray-100 m-2 flex justify-center items-center"
        onClick={() => {
          itemsCount === 4 ? setItemsCount(videoOpt.length) : setItemsCount(4);
          itemsCount === 4
            ? setBtnTitle("Show less options")
            : setBtnTitle("Load more video options");
        }}
      >
        {btnTitle}
      </button>
      {dlStatus.isDownloading ? <DownloadProgress progress={dlStatus.progress} handleCancel={handleDownloadStatus} />:null }
    </div>
  );
}

export default HandleVideoInfo;
