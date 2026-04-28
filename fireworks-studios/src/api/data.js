const STORAGE_KEYS = {
  tracks: "fireworks_tracks",
  gallery: "fireworks_gallery",
};

const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const getTracks = () => {
  return getStored(STORAGE_KEYS.tracks, [
    { id: 1, title: "Summer Vibes", artist: "DJ Fire", plays: 1200, url: "" },
    { id: 2, title: "Night City", artist: "Metro Beats", plays: 850, url: "" },
    { id: 3, title: "Golden Hour", artist: "Sunset Collective", plays: 0, url: "" },
  ]);
};

export const getGallery = () => {
  return getStored(STORAGE_KEYS.gallery, [
    { id: 1, type: "image", title: "Studio Session", url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600", description: "Recording session" },
    { id: 2, type: "image", title: "Live Performance", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600", description: "DJ performance" },
  ]);
};
