const express = require("express");
const ytdlp = require("yt-dlp-exec");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
    console.error("YOUTUBE_API_KEY is missing in the environment variables");
    process.exit(1);
}

const isValidUrl = (url) => {
    try {
        new URL(url);
        return url.includes("youtube.com") || url.includes("youtu.be");
    } catch (_) {
        return false;
    }
};

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET"],
};
app.use(cors(corsOptions));

app.get("/video-info", async (req, res) => {
    // existing video info code here...
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).json({ error: "No URL provided" });
    }

    if (!isValidUrl(videoUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    console.log(`Video URL provided: ${videoUrl}`);
    console.log("Fetching video details, please wait...");

    try {
      const info = await ytdlp(videoUrl, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
      });

      const videoId = info.id;
      const [videoResponse, channelResponse] = await Promise.all([
        axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
        ),
        axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${info.channel_id}&key=${YOUTUBE_API_KEY}`
        ),
      ]);

      const videoSnippet = videoResponse.data.items?.[0]?.snippet || {};
      const channelSnippet = channelResponse.data.items?.[0]?.snippet || {};

      const formats = info.formats.map((format) => {
        const ext = format.ext || "Unknown";
        const fileSize = format.filesize
          ? `${(format.filesize / 1e6).toFixed(2)} MB`
          : "Unknown";
          return {
              formatId: format.format_id,
              resolution: format.resolution || `${format.width}x${format.height}` || "audio-only",
              videoCodec: format.vcodec,
              audioCodec: format.acodec,
              fileSize: fileSize,
              videoQuality: format.height ? `${format.height}p` : "Audio Only",
              audioBitrate: format.abr ? `${format.abr} kbps` : "Unknown",
              ext: ext,
              url: format.url || "Unknown",
              title: info.title
          };
      });

      console.log("Formatted video details:");

      let vurl = formats.filter((item) => item.url.includes("https://rr") && item.videoQuality !== "Audio Only" && item.resolution !== "audio-only");
      const videoPlayUrl = vurl.length > 0 ? vurl[vurl.length - 1].url : null;
      console.log(videoPlayUrl)


      res.json({
        url: info.url,
        title: info.title,
        duration: info.duration,
        thumbnail: info.thumbnail,
        author: info.uploader,
        authorImg: channelSnippet.thumbnails?.default?.url || "Unknown",
        channelUrl: info.channel_url,
        formats,
        videoUrl: videoPlayUrl
      });
    } catch (err) {
      console.error("Error fetching video info:", err);
      const errorMessage =
        err.response?.data?.error?.message ||
        err.message ||
        "An unknown error occurred.";
      res.status(500).json({ error: errorMessage });
    }
  });

app.get("/download", async (req, res) => {
  const { formatId, url } = req.query;
    if (!formatId || !url) {
        return res
            .status(400)
            .json({ error: "Missing formatId or video URL" });
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const sendEvent = (event, data) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    sendEvent("message", { status: "started", message: "Download started" }); // Start message

    console.log(`Download request for formatId: ${formatId}, URL: ${url}`);

    try {
        const tempFilePath = path.join(__dirname, `temp_video_${Date.now()}`);
        await ytdlp(url, {
          format: formatId,
          noWarnings: true,
          noCallHome: true,
          noCheckCertificate: true,
          output: tempFilePath+".mp4",
        });

      sendEvent("message", { status: "completed", message: "Download completed" });

      res.sendFile(tempFilePath+".mp4", {}, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          sendEvent("message", { status: "error", message: "Error sending the file" });
          res.status(500).end(); // Make sure to close the connection
        } else {
          console.log("File sent successfully");
          fs.unlink(tempFilePath+".mp4", (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting temp file:", unlinkErr)
              sendEvent("message", { status: "error", message: "Error deleting the temp file" });
            } else{
              console.log("Temp file deleted")
            }
          });
           res.end() // Send the end signal to close the connection
        }
       });
    } catch (err) {
        console.error("Error downloading video:", err);
        sendEvent("message", {
          status: "error",
          message: "Error downloading the video",
        });
      res.status(500).end(); // Make sure to close the connection
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});