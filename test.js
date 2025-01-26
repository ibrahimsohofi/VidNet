const { exec } = require('child_process');

async function fetchVideoInfo(videoUrl) {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -J ${videoUrl}`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
        return;
      }
      const info = JSON.parse(stdout);
      resolve(info.formats);
    });
  });
}

async function downloadVideo(videoUrl, quality) {
  try {
    // Fetch video metadata
    const formats = await fetchVideoInfo(videoUrl);
    
    // Find the format based on the requested quality (resolution)
    const selectedFormat = formats.find(format => format.height === parseInt(quality));

    if (selectedFormat) {
      console.log(`Selected format: ${selectedFormat.format_id} - ${selectedFormat.format}`);
      // Download the video with the selected format ID
      const command = `yt-dlp -f ${selectedFormat.format_id} ${videoUrl}`;

      exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
          console.error('Error downloading video:', error || stderr);
          return;
        }
        console.log('Download started:', stdout);
      });
    } else {
      console.log(`No format found for ${quality}p.`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example Usage
(async () => {
  const videoUrl = 'https://www.youtube.com/watch?v=KLG4TwvPcqg';
  
  // Example: Request 1080p quality
  await downloadVideo(videoUrl, '1080');
})();
