const axios = require("axios");
const yts = require("yt-search");

module.exports = [{
  command: ["video"],
  operate: async ({ m, reply, args, Cypher }) => {
    if (!args.length) {
      return reply("*Please provide a song name or keywords to search for.*");
    }

    const searchQuery = args.join(" ");
    await reply("*🎥 Searching for the video...*");

    try {
      const searchResults = await yts(searchQuery);

      if (!searchResults.videos || searchResults.videos.length === 0) {
        return reply(`❌ No results found for "${searchQuery}".`);
      }

      const firstResult = searchResults.videos[0];
      const videoUrl = firstResult.url;

      // API call to download the video
      const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`;
      const response = await axios.get(apiUrl);

      if (!response.data.success) {
        return reply(`❌ Failed to fetch video for "${searchQuery}".`);
      }

      const { title, download_url } = response.data.result;

      await Cypher.sendMessage(
        m.chat,
        {
          video: { url: download_url },
          mimetype: "video/mp4",
          caption: `*${title}*\n\nPowered By ⓃⒺCⓉOR🍯`,
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Video Download Error:", error);
      reply("❌ An error occurred while processing your request.");
    }
  }
}];
          
