const STORAGE_KEYS = {
  tracks: 'fireworks_tracks',
  gallery: 'fireworks_gallery',
  bookings: 'fireworks_bookings',
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

const defaultTracks = [
  { id: 1, title: 'Summer Vibes', artist: 'DJ Fire', plays: 1200, url: '' },
  { id: 2, title: 'Night City', artist: 'Metro Beats', plays: 850, url: '' },
];

const defaultGallery = [
  { id: 1, type: 'image', title: 'Studio Session', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600', description: 'Recording session' },
  { id: 2, type: 'image', title: 'Live Performance', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', description: 'DJ performance' },
];

export const tracksApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/tracks');
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      return getStored(STORAGE_KEYS.tracks, defaultTracks);
    }
  },
  add: async (track) => {
    try {
      const res = await fetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track),
      });
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      const tracks = getStored(STORAGE_KEYS.tracks, defaultTracks);
      const newTrack = { ...track, id: Date.now() };
      setStored(STORAGE_KEYS.tracks, [...tracks, newTrack]);
      return newTrack;
    }
  },
  delete: async (id) => {
    try {
      await fetch(`/api/tracks/${id}`, { method: 'DELETE' });
    } catch {
      const tracks = getStored(STORAGE_KEYS.tracks, defaultTracks);
      setStored(STORAGE_KEYS.tracks, tracks.filter(t => t.id !== id));
    }
  },
};

export const galleryApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      return getStored(STORAGE_KEYS.gallery, defaultGallery);
    }
  },
  upload: async (item) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      const gallery = getStored(STORAGE_KEYS.gallery, defaultGallery);
      const newItem = { ...item, id: Date.now() };
      setStored(STORAGE_KEYS.gallery, [...gallery, newItem]);
      return newItem;
    }
  },
  delete: async (id) => {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    } catch {
      const gallery = getStored(STORAGE_KEYS.gallery, defaultGallery);
      setStored(STORAGE_KEYS.gallery, gallery.filter(m => m.id !== id));
    }
  },
};

export const bookingsApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/bookings');
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      return getStored(STORAGE_KEYS.bookings, []);
    }
  },
  add: async (data) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    } catch {
      const bookings = getStored(STORAGE_KEYS.bookings, []);
      const newBooking = { ...data, id: Date.now(), status: 'pending' };
      setStored(STORAGE_KEYS.bookings, [...bookings, newBooking]);
      return newBooking;
    }
  },
  updateStatus: async (id, status) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {
      const bookings = getStored(STORAGE_KEYS.bookings, []);
      const updated = bookings.map(b => b.id == id ? { ...b, status } : b);
      setStored(STORAGE_KEYS.bookings, updated);
    }
  },
  delete: async (id) => {
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    } catch {
      const bookings = getStored(STORAGE_KEYS.bookings, []);
      setStored(STORAGE_KEYS.bookings, bookings.filter(b => b.id != id));
    }
  },
};