const express = require("express");
const ytdlp = require("yt-dlp-exec");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.includes("youtube.com") || url.includes("youtu.be");
  } catch (_) {
    return false;
  }
};

// Enable CORS for all routes
app.use(cors());

// Endpoint to fetch video info
app.get("/video-info", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "No URL provided" });
  }

  if (!isValidUrl(videoUrl)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdlp(videoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
    });

    const formats = info.formats.map((format) => ({
      formatId: format.format_id,
      resolution: format.resolution || "audio-only",
      fileSize: format.filesize ? `${(format.filesize / 1e6).toFixed(2)} MB` : "Unknown",
      ext: format.ext,
    }));

    res.json({
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      formats,
    });
  } catch (err) {
    console.error("Error fetching video info:", err);
    res.status(500).json({ error: "Failed to fetch video information." });
  }
});

// Endpoint to download video/audio with selected format
app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;
  const formatId = req.query.formatId;

  if (!videoUrl || !formatId) {
    return res.status(400).json({ error: "URL or format ID is missing." });
  }

  try {
    const output = `downloads/video.${formatId}`;
    await ytdlp(videoUrl, {
      format: formatId,
      output,
    });

    res.download(output, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } catch (err) {
    console.error("Error downloading video/audio:", err);
    res.status(500).json({ error: "Failed to download video/audio." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
