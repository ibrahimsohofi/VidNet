const express = require("express");
const ytdlp = require("yt-dlp-exec");
const cors = require("cors");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
const tough = require("tough-cookie");
const dotenv = require("dotenv");
const { spawn } = require("child_process");
const { pipeline } = require("stream");
const axios = require("axios");
dotenv.config();
puppeteer.use(StealthPlugin());
const app = express();
const PORT = process.env.PORT || 10000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.error("YOUTUBE_API_KEY is missing in the environment variables");
  process.exit(1);
}

const cookiesFilePath = path.join(__dirname, "cookies.txt");

// ✅ Function to Extract & Save YouTube Cookies in Netscape Format
const saveYoutubeCookies = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    console.log("🔗 Navigating to YouTube...");
    await page.goto("https://www.youtube.com", { waitUntil: "networkidle2" });

    console.log("✅ Login manually if required...");
    await page.waitForTimeout(15000); // Adjust delay if needed

    console.log("✅ Retrieving cookies...");
    const cookies = await page.cookies();
    const cookieJar = new tough.CookieJar();
    
    for (const cookie of cookies) {
      const toughCookie = new tough.Cookie({
        key: cookie.name,
        value: cookie.value,
        domain: cookie.domain.replace(/^\./, ""),
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expires: cookie.expires ? new Date(cookie.expires * 1000) : "Infinity",
      });
      cookieJar.setCookieSync(toughCookie, `https://${cookie.domain}`);
    }

    // ✅ Save Cookies in Netscape Format
    fs.writeFileSync(cookiesFilePath, cookieJar.serializeSync(), "utf8");
    console.log(`🍪 Cookies saved to: ${cookiesFilePath}`);

    await browser.close();
    console.log("🚀 Process completed!");
  } catch (error) {
    console.error("Error saving YouTube cookies:", error);
    throw new Error(`Failed to save YouTube cookies: ${error.message}`);
  }
};

// ✅ Validate YouTube URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.includes("youtube.com") || url.includes("youtu.be");
  } catch (_) {
    return false;
  }
};

// ✅ Enable CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET"],
};
app.use(cors(corsOptions));

// 🔥 **Save Cookies Endpoint**
app.get("/save-cookies", async (req, res) => {
  try {
    console.log("🔄 Saving YouTube cookies...");
    await saveYoutubeCookies();
    res.json({ message: "YouTube cookies saved successfully." });
  } catch (error) {
    console.error("Error saving YouTube cookies:", error);
    res.status(500).json({ error: `Failed to save YouTube cookies: ${error.message}` });
  }
});

// 🔥 **Get Video Info (Uses Cookies)**
app.get("/video-info", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "No URL provided" });

  if (!isValidUrl(videoUrl)) return res.status(400).json({ error: "Invalid YouTube URL" });

  console.log(`Fetching details for: ${videoUrl}`);

  try {
    // Verify yt-dlp Path
    const ytDlpPath = path.join(__dirname, "node_modules", "yt-dlp-exec", "bin", "yt-dlp");
    if (!fs.existsSync(ytDlpPath)) {
      console.error(`yt-dlp executable not found at: ${ytDlpPath}`);
      return res.status(500).json({ error: `yt-dlp executable not found at: ${ytDlpPath}` });
    }

    // Fetch Video Metadata Using yt-dlp + Cookies
    const info = await ytdlp(videoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      cookies: cookiesFilePath, // Pass cookies here
    });

    const formats = info.formats.map((format) => {
      const fileSize = format.filesize ? `${(format.filesize / 1e6).toFixed(2)} MB` : "Unknown";
      return {
        formatId: format.format_id,
        resolution: format.resolution || `${format.width}x${format.height}` || "audio-only",
        videoCodec: format.vcodec,
        audioCodec: format.acodec,
        fileSize,
        videoQuality: format.height ? `${format.height}p` : "Audio Only",
        audioBitrate: format.abr ? `${format.abr} kbps` : "Unknown",
        ext: format.ext || "Unknown",
        url: format.url || "Unknown",
      };
    });

    let vurl = formats.filter(
      (item) =>
        item.url.includes("https://rr") &&
        item.videoQuality !== "Audio Only" &&
        item.resolution !== "audio-only"
    );
    const videoPlayUrl = vurl.length > 0 ? vurl[vurl.length - 1].url : null;

    res.json({
      url: info.url,
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      author: info.uploader,
      formats,
      videoUrl: videoPlayUrl,
    });
  } catch (err) {
    console.error("Error fetching video info:", err);
    if (err.message.includes("yt-dlp executable not found")) {
      res.status(500).json({ error: err.message });
    } else if (err.message.includes("Cookies")) {
      res.status(500).json({ error: "Cookie-related error. Please check your cookie setup." });
    } else {
      res.status(500).json({ error: "Unexpected error occurred. Please try again later." });
    }
  }
});

// 🔥 **Download Video (Uses Cookies)**
app.get("/download", (req, res) => {
  const { quality, extension, url } = req.query;
  if (!url || !quality || !extension) {
    return res.status(400).json({ message: "Missing required parameters." });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const format = `bestvideo[height<=${quality}]+bestaudio`;

  // ✅ Use yt-dlp with cookies
  const ytDlpPath = path.join(__dirname, "node_modules", "yt-dlp-exec", "bin", "yt-dlp");
  const ytDlpProcess = spawn(ytDlpPath, [
    "-f", format,
    "--merge-output-format", extension,
    "--cookies", cookiesFilePath, // Ensure cookies are passed
    url,
  ]);

  let lastProgress = 0;

  ytDlpProcess.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(output);
    const progressMatches = output.match(/(\d+\.\d+)%/g);
    if (progressMatches) {
      const latestProgress = parseFloat(progressMatches[progressMatches.length - 1]);
      if (latestProgress >= lastProgress) {
        lastProgress = latestProgress;
        res.write(JSON.stringify({ progress: latestProgress }) + "\n");
      }
    }
  });

  ytDlpProcess.stderr.on("data", (data) => {
    console.error("yt-dlp error:", data.toString());
  });

  ytDlpProcess.on("close", (code) => {
    if (code === 0) {
      res.write(JSON.stringify({ message: "Download completed", progress: 100 }) + "\n");
    } else {
      res.write(JSON.stringify({ error: "Download failed", code }) + "\n");
    }
    res.end();
  });
});

// 🔥 **Download Images**
app.get("/dl", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }
  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    res.set("Content-Type", response.headers["content-type"]);
    pipeline(response.data, res, (err) => {
      if (err) res.status(500).send("Failed to stream image");
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
