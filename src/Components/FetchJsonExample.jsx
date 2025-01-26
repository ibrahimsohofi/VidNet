import React, { useEffect, useState } from "react";

const FetchJsonExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/videoinfo.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
        <div className="spinner"></div> {/* Add CSS for spinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error Loading Data</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!data) {
    return <p>No data available. Please check the source file.</p>;
  }

  // Safely access video and format data
  const videoInfo = {
    videoTitle: data.title || "Unknown Title",
    videoDuration: data.duration || "Unknown Duration",
    videoThumbnail: data.thumbnail || "",
    videoUrl: data.url || "",
    author: data.author || "Unknown Author",
    authorThumbnail: data.authorImg || "",
    channelUrl: data.channelUrl || "",
  };

  const mediaInfo = Array.isArray(data.formats)
    ? data.formats.map((format) => ({
        formatId: format.formatId || "Unknown",
        resolution: format.resolution || "Unknown",
        fileSize: format.fileSize || "Unknown",
        videoQuality: format.videoQuality || "Unknown",
        audioQuality: format.audioBitrate || "Unknown",
        fileExtension: format.ext || "Unknown",
        fileUrl: format.url || "",
      }))
    : [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{videoInfo.videoTitle}</h1>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={videoInfo.videoThumbnail}
          alt="Video Thumbnail"
          width="300"
          className="rounded-lg shadow-md"
        />
        <div>
          <p>
            <strong>Author:</strong> {videoInfo.author}
          </p>
          <p>
            <strong>Duration:</strong> {videoInfo.videoDuration}
          </p>
          <a
            href={videoInfo.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Watch Video
          </a>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Formats</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border">Format ID</th>
              <th className="p-3 border">Resolution</th>
              <th className="p-3 border">File Size</th>
              <th className="p-3 border">Video Quality</th>
              <th className="p-3 border">Audio Bitrate</th>
              <th className="p-3 border">File Extension</th>
              <th className="p-3 border">Download</th>
            </tr>
          </thead>
          <tbody>
            {mediaInfo.map((format, index) => {
              // Determine background color based on conditions
              console.log(format.fileExtension)
              let rowClassName = "hover:bg-gray-200";

              // Apply alternating row colors
              if (index % 2 !== 0) {
                rowClassName += " bg-gray-100";
              } else {
                rowClassName += " bg-white";
              }
          
              // Apply red background for "Unknown" file extensions
              if (format.fileExtension === "unknown") {
                rowClassName += " hidden";
              }
              return (
                <tr className={rowClassName.trim()} key={index}>
                  <td className="p-3 border">{format.formatId}</td>
                  <td className="p-3 border">{format.resolution}</td>
                  <td className="p-3 border">{format.fileSize}</td>
                  <td className="p-3 border">{format.videoQuality}</td>
                  <td className="p-3 border">{format.audioQuality}</td>
                  <td className="p-3 border">{format.fileExtension}</td>
                  <td className="p-3 border">
                    {format.fileUrl ? (
                      <a
                        href={format.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Available</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchJsonExample;
