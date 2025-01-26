import React, { useState } from 'react';


function Header2() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ isActive: false, error: '' });
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      setError({ isActive: true, error: 'Failed to read from clipboard' });
    }
  };

  const handleDownload = () => {
    if (!inputValue) {
      setError({ isActive: true, error: 'Please enter a video URL' });
      return;
    }
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setVideoInfo({
        videoTitle: 'Sample Video Title',
        videoThumbnail: 'https://via.placeholder.com/150',
        videoDuration: '5:25',
        author: 'Sample Author',
        channelUrl: 'https://example.com',
        videoUrl: inputValue,
      });
    }, 2000);
  };

  const handleActiveError = () => {
    setError({ isActive: false, error: '' });
  };

  const downloadVideo = (url) => {
    alert(`Downloading video from: ${url}`);
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="w-full h-auto flex flex-col items-center justify-start bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white py-8 px-4 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold">
            Download <span className="text-yellow-300">Videos & Audio</span> Instantly
          </h1>
          <p className="text-lg opacity-90">
            Convert videos into your desired format in just a few clicks!
          </p>
        </div>
        <div className="mt-6 w-full md:w-4/5 flex flex-col md:flex-row items-center gap-2">
          <button
            onClick={handlePasteClipboard}
            className="flex items-center justify-center h-14 w-full md:w-14 bg-gray-100 text-gray-700 rounded-md md:rounded-l-md hover:bg-gray-200"
            title="Paste from clipboard"
          >
            <img src="./svg/clipboard-outline.svg" alt="Clipboard Icon" className="h-6 w-6" />
          </button>
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="url"
            className="w-full h-14 px-4 text-gray-900 rounded-md md:rounded-none border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Paste your video URL here"
          />
          <button
            onClick={handleDownload}
            className="h-14 w-full md:w-auto px-6 bg-yellow-400 text-gray-900 font-bold rounded-md md:rounded-r-md hover:bg-yellow-500 transition-all"
          >
            Download
          </button>
        </div>
      </header>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4">Fetching video details...</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error.isActive && (
        <div
          className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center"
          role="alert"
        >
          <span className="mr-2">⚠️</span>
          {error.error}
          <button
            className="ml-auto text-lg font-bold"
            onClick={handleActiveError}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* Video Info Card */}
      {videoInfo && (
        <div className="mt-8 max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-hidden flex">
          <img
            src={videoInfo.videoThumbnail}
            alt="Video Thumbnail"
            className="w-1/3 object-cover"
          />
          <div className="w-2/3 p-4">
            <h2 className="text-lg font-bold text-gray-900">{videoInfo.videoTitle}</h2>
            <p className="text-sm text-gray-600">By {videoInfo.author}</p>
            <p className="text-sm text-gray-500">Duration: {videoInfo.videoDuration}</p>
            <a
              href={videoInfo.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Visit Channel
            </a>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-orange-600"
              onClick={() => downloadVideo(videoInfo.videoUrl)}
            >
              Download Video
            </button>
          </div>
        </div>
      )}

      {/* How to Use Section */}
      <div className="mt-12 bg-gray-100 py-8 px-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <img src="./svg/step1.svg" alt="Step 1" className="h-16 w-16" />
            <p className="text-gray-700 text-sm mt-2">Copy the video URL</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="./svg/step2.svg" alt="Step 2" className="h-16 w-16" />
            <p className="text-gray-700 text-sm mt-2">Paste it in the input</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="./svg/step3.svg" alt="Step 3" className="h-16 w-16" />
            <p className="text-gray-700 text-sm mt-2">Click Download</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header2;
