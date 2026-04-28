const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const handleResponse = async (res) => {
  if (!res.ok) throw new Error('API error');
  return res.json();
};

export const tracksApi = {
  getAll: async () => handleResponse(await fetch(`${API_URL}/tracks`)),
  add: async (track) => handleResponse(await fetch(`${API_URL}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(track),
  })),
  delete: async (id) => handleResponse(await fetch(`${API_URL}/tracks/${id}`, { method: 'DELETE' })),
};

export const galleryApi = {
  getAll: async () => handleResponse(await fetch(`${API_URL}/gallery`)),
  upload: async (data) => handleResponse(await fetch(`${API_URL}/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })),
  delete: async (id) => handleResponse(await fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE' })),
};

export const bookingsApi = {
  getAll: async () => handleResponse(await fetch(`${API_URL}/bookings`)),
  add: async (data) => handleResponse(await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })),
  updateStatus: async (id, status) => handleResponse(await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })),
  delete: async (id) => handleResponse(await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' })),
};