const { default: axios } = require("axios");

async function tiktokInfo(url) {
  const urlTiktok = decodeURIComponent(url);
  const domain_api = `https://itzpire.com/download/tiktok?url=${urlTiktok}`;

  const response = await axios.get(domain_api);
  //console.log(response.data.data.video);

  if (response.data.author) {
    delete response.data.author;
  }

  return response.data.data;
}

async function instagramInfo(url) {
  const urlTwitter = decodeURIComponent(url);
  const domain_api = `https://api.agatz.xyz/api/instagram?url=${urlTwitter}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.creator) {
    delete response.data.creator;
  }

  return response.data.data;
}

async function spotifyInfo(url) {
  const urlSpotify = decodeURIComponent(url);
  const domain_api = `https://api.agatz.xyz/api/spotifydl?url=${urlSpotify}`;

  try {
    const response = await axios.get(domain_api);

    // Check if response.data is a string or an object
    let cleanResponseData;

    if (typeof response.data === "string") {
      // If it's a string, clean it
      cleanResponseData = response.data.replace(/\n/g, "");
    } else {
      // If it's already an object, use it directly
      cleanResponseData = response.data;
    }

    // Now we can check for the 'creator' field
    if (cleanResponseData.creator) {
      delete cleanResponseData.creator;
    }

    // Assuming 'data' field is a string and needs parsing
    const data = JSON.parse(cleanResponseData.data); // Parse the data field

    // Extract audio information
    const audioInfo = {
      nama_channel: data.nama_channel,
      title: data.judul,
      duration: data.durasi,
      imageUrl: data.gambar_kecil[0]?.url, // Use optional chaining to avoid errors
      audioUrl: data.url_audio_v1,
    };

    return audioInfo;
  } catch (error) {
    console.error(
      "Error fetching Spotify data:",
      error.message
    );
    throw error; // Rethrow the error for handling outside
  }
}

async function twitterInfo(url) {
  const urlTwitter = decodeURIComponent(url);
  const domain_api = `https://itzpire.com/download/twitter?url=${urlTwitter}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.author) {
    delete response.data.author;
  }

  return response.data.data;
}

module.exports = {
  twitterInfo,
  tiktokInfo,
  spotifyInfo,
  instagramInfo,
};
