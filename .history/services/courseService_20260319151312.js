const axios = require('axios');

async function getYouTubeResources(skill, level) {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const query = `${skill} ${level} level engineering tutorial`;
    
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${API_KEY}`;
        const res = await axios.get(url);
        return res.data.items.map(v => ({
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.medium.url,
            // FIXED THE URL HERE
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`
        }));
    } catch (e) {
        console.error("YouTube API Error:", e.message);
        return [];
    }
}

module.exports = { getYouTubeResources };