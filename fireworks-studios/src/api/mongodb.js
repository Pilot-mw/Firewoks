const STORAGE_KEYS = {
  tracks: "fireworks_tracks",
  gallery: "fireworks_gallery",
  bookings: "fireworks_bookings",
};

const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const tracksApi = {
  getAll: async () => {
    return getStored(STORAGE_KEYS.tracks, [
      { id: 1, title: "Summer Vibes", artist: "DJ Fire", plays: 1200, url: "" },
      { id: 2, title: "Night City", artist: "Metro Beats", plays: 850, url: "" },
    ]);
  },
  add: async (track) => {
    const tracks = await tracksApi.getAll();
    const newTrack = { ...track, id: Date.now() };
    setStored(STORAGE_KEYS.tracks, [...tracks, newTrack]);
    return newTrack;
  },
  delete: async (id) => {
    const tracks = await tracksApi.getAll();
    setStored(STORAGE_KEYS.tracks, tracks.filter(t => t.id !== id));
  },
};

export const galleryApi = {
  getAll: async () => {
    return getStored(STORAGE_KEYS.gallery, [
      { id: 1, type: "image", title: "Studio Session", url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600", description: "Recording session" },
      { id: 2, type: "image", title: "Live Performance", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600", description: "DJ performance" },
    ]);
  },
  upload: async (item) => {
    const gallery = await galleryApi.getAll();
    const newItem = { ...item, id: Date.now() };
    setStored(STORAGE_KEYS.gallery, [...gallery, newItem]);
    return newItem;
  },
  delete: async (id) => {
    const gallery = await galleryApi.getAll();
    setStored(STORAGE_KEYS.gallery, gallery.filter(m => m.id !== id));
  },
};

export const bookingsApi = {
  getAll: async () => {
    return getStored(STORAGE_KEYS.bookings, []);
  },
  add: async (data) => {
    const bookings = await bookingsApi.getAll();
    const newBooking = { ...data, id: Date.now(), status: 'pending' };
    setStored(STORAGE_KEYS.bookings, [...bookings, newBooking]);
    return newBooking;
  },
  updateStatus: async (id, status) => {
    const bookings = await bookingsApi.getAll();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setStored(STORAGE_KEYS.bookings, updated);
  },
  delete: async (id) => {
    const bookings = await bookingsApi.getAll();
    setStored(STORAGE_KEYS.bookings, bookings.filter(b => b.id !== id));
  },
};