const axios = require('axios');

async function getYouTubeResources(skill, level) {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    // We search for "tutorial" to ensure we get learning content
    const query = `${skill} ${level} level programming tutorial`;
    
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${API_KEY}`;
        const res = await axios.get(url);
        
        // Ensure we actually got items back
        if (!res.data.items || res.data.items.length === 0) return [];

        return res.data.items.map(v => ({
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.medium.url,
            // FIXED: Proper template literal for YouTube URL
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`
        }));
    } catch (e) {
        console.error("YouTube API Error:", e.response ? e.response.data : e.message);
        return []; // Return empty array so the app doesn't crash
    }
}

module.exports = { getYouTubeResources };