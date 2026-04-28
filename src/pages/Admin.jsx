import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { tracksApi, galleryApi, bookingsApi } from "../api/mongodb";

/* ---------------- DASHBOARD ---------------- */
function Dashboard() {
  const [stats, setStats] = useState({ tracks: 0, bookings: 0, visitors: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracks, gallery, bookings] = await Promise.all([
          tracksApi.getAll(),
          galleryApi.getAll(),
          bookingsApi.getAll(),
        ]);
        setStats({
          tracks: tracks.length,
          bookings: bookings.filter(b => b.status === 'pending').length,
          visitors: 156,
          gallery: gallery.length,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ color: '#9ca3af', textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
      <div style={glassCard}>
        <div style={statNumber}>{stats.tracks}</div>
        <div style={statLabel}>Total Tracks</div>
      </div>
      <div style={glassCard}>
        <div style={statNumber}>{stats.bookings}</div>
        <div style={statLabel}>New Bookings</div>
      </div>
      <div style={glassCard}>
        <div style={statNumber}>{stats.visitors}</div>
        <div style={statLabel}>Total Visitors</div>
      </div>
      <div style={glassCard}>
        <div style={statNumber}>{stats.gallery}</div>
        <div style={statLabel}>Gallery Items</div>
      </div>
    </div>
  );
}

/* ---------------- MUSIC ---------------- */
function MusicManager() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", artist: "", file: null });

  useEffect(() => {
    tracksApi.getAll().then(setTracks).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleAddTrack = async () => {
    const title = form.title.trim();
    const artist = form.artist.trim();
    if (!title || !artist) {
      alert("Please enter both title and artist");
      return;
    }
    let url = "";
    if (form.file) {
      url = URL.createObjectURL(form.file);
    }
    try {
      const newTrack = await tracksApi.add({ title, artist, plays: 0, url });
      setTracks([...tracks, newTrack]);
      setForm({ title: "", artist: "", file: null });
    } catch (err) {
      alert("Failed to add track");
    }
  };

  const handleDelete = async (id) => {
    try {
      await tracksApi.delete(id);
      setTracks(tracks.filter(t => t._id !== id));
    } catch (err) {
      alert("Failed to delete track");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const title = file.name.replace(/\.[^/.]+$/, "");
      setForm({ ...form, file: file, title });
    }
  };

  if (loading) return <div style={{ color: '#9ca3af', textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={glassCard}>
        <h2 style={sectionTitle}>Add New Track</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div onClick={() => document.getElementById('audio-upload').click()} style={fileSelectBox}>
            <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>🎵</span>
            {form.file ? form.file.name : "Click to select audio file (MP3, WAV)"}
          </div>
          <input id="audio-upload" type="file" accept="audio/*" onChange={handleFileChange} style={fileInputHidden} />
          <input placeholder="Track Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={input} />
          <input placeholder="Artist Name" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} style={input} />
          <button onClick={handleAddTrack} style={btnPrimary}>Add Track</button>
        </div>
      </div>

      <div style={glassCard}>
        <h2 style={sectionTitle}>Track List</h2>
        {tracks.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No tracks yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tracks.map((track) => (
              <div key={track._id} style={listItem}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {track.url && <audio controls src={track.url} style={{ height: "32px" }} />}
                  <div>
                    <span style={{ color: "white", fontWeight: "500" }}>{track.title}</span>
                    <span style={{ color: "#6b7280", marginLeft: "8px" }}>- {track.artist}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ color: "#4b5563", fontSize: "14px" }}>{track.plays} plays</span>
                  <button onClick={() => handleDelete(track._id)} style={deleteBtn}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- BOOKINGS ---------------- */
function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi.getAll().then(setBookings).catch(console.error).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await bookingsApi.updateStatus(id, status);
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await bookingsApi.delete(id);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  if (loading) return <div style={{ color: '#9ca3af', textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div style={glassCard}>
      <h2 style={sectionTitle}>Booking Requests</h2>
      {bookings.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No bookings yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {bookings.map((booking) => (
            <div key={booking._id} style={listItem}>
              <div>
                <div style={{ color: "white", fontWeight: "500" }}>{booking.name}</div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>{booking.service} - {booking.date}</div>
                <div style={{ color: "#4b5563", fontSize: "13px" }}>{booking.email} | {booking.phone}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  background: booking.status === "confirmed" ? "rgba(34,197,94,0.2)" : "rgba(234,179,8,0.2)",
                  color: booking.status === "confirmed" ? "#4ade80" : "#facc15",
                }}>
                  {booking.status}
                </span>
                {booking.status === "pending" && (
                  <button onClick={() => updateStatus(booking._id, "confirmed")} style={{ ...actionBtn, background: "#22c55e" }}>Confirm</button>
                )}
                <button onClick={() => deleteBooking(booking._id)} style={deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- GALLERY ---------------- */
function GalleryManager() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", file: null });

  useEffect(() => {
    galleryApi.getAll().then(setMedia).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleUploadClick = async () => {
    if (!form.file) {
      alert("Please select a file");
      return;
    }
    const isVideo = form.file.type.startsWith("video/");
    const url = URL.createObjectURL(form.file);
    const title = form.title.trim() || form.file.name;
    try {
      const newItem = await galleryApi.upload({ type: isVideo ? "video" : "image", title, url, description: form.description.trim() });
      setMedia([...media, newItem]);
      setForm({ title: "", description: "", file: null });
    } catch (err) {
      alert("Failed to upload media");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const title = file.name.replace(/\.[^/.]+$/, "");
      setForm({ ...form, file: file, title });
    }
  };

  const handleDelete = async (id) => {
    try {
      await galleryApi.delete(id);
      setMedia(media.filter(m => m._id !== id));
    } catch (err) {
      alert("Failed to delete media");
    }
  };

  if (loading) return <div style={{ color: '#9ca3af', textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={glassCard}>
        <h2 style={sectionTitle}>Upload Media</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div onClick={() => document.getElementById('file-upload').click()} style={fileSelectBox}>
            <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>📁</span>
            {form.file ? form.file.name : "Click to select image or video"}
          </div>
          <input id="file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} style={fileInputHidden} />
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={input} />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...input, minHeight: "100px", resize: "vertical" }} />
          <button onClick={handleUploadClick} disabled={!form.file} style={form.file ? btnPrimary : btnDisabled}>Upload Media</button>
        </div>
      </div>

      <div style={glassCard}>
        <h2 style={sectionTitle}>Gallery</h2>
        {media.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No media yet</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "16px" }}>
            {media.map((item) => (
              <div key={item._id} style={mediaCard}>
                {item.type === "image" ? <img src={item.url} alt={item.title} style={mediaImg} /> : <video src={item.url} style={mediaImg} controls />}
                <div style={{ padding: "16px" }}>
                  <h3 style={{ color: "white", fontWeight: "600", marginBottom: "4px" }}>{item.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>{item.description}</p>
                  <button onClick={() => handleDelete(item._id)} style={deleteBtn}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- ADMIN ---------------- */
export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/music", label: "Music", icon: "🎵" },
    { path: "/admin/bookings", label: "Bookings", icon: "📅" },
    { path: "/admin/gallery", label: "Gallery", icon: "🖼️" },
  ];

  const isActive = (path) => path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  return (
    <div style={adminContainer}>
      <aside style={sidebar}>
        <div style={logo}>
          <span style={{ color: "#facc15", fontSize: "24px" }}>🔥</span>
          <span style={{ color: "white", fontWeight: "bold" }}>Fireworks</span>
        </div>
        <nav style={sidebarNav}>
          {menuItems.map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} style={isActive(item.path) ? sidebarItemActive : sidebarItem}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={sidebarFooter}>
          <button onClick={() => { localStorage.removeItem("admin_logged_in"); window.location.href = "/"; }} style={logoutBtn}>Logout</button>
          <Link to="/" style={backLink}>← Back to Site</Link>
        </div>
      </aside>

      <main style={mainContent}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="music" element={<MusicManager />} />
          <Route path="bookings" element={<BookingManager />} />
          <Route path="gallery" element={<GalleryManager />} />
        </Routes>
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const adminContainer = { display: "flex", minHeight: "100vh", background: "#0a0a0f" };
const sidebar = { width: "260px", background: "rgba(10,10,15,0.95)", borderRight: "1px solid #1f2937", padding: "24px 16px", display: "flex", flexDirection: "column", position: "fixed", height: "100vh" };
const logo = { display: "flex", alignItems: "center", gap: "8px", fontSize: "20px", fontWeight: "bold", marginBottom: "40px", paddingLeft: "8px" };
const sidebarNav = { display: "flex", flexDirection: "column", gap: "8px", flex: 1 };
const sidebarItem = { display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "8px", background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "15px", textAlign: "left" };
const sidebarItemActive = { ...sidebarItem, background: "rgba(250,204,21,0.15)", color: "#facc15", borderLeft: "3px solid #facc15" };
const sidebarFooter = { paddingTop: "24px", borderTop: "1px solid #1f2937" };
const backLink = { display: "block", padding: "12px 16px", color: "#facc15", textDecoration: "none", fontSize: "14px" };
const logoutBtn = { background: "#ef4444", color: "white", fontWeight: "600", padding: "10px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", width: "100%", marginBottom: "8px" };
const mainContent = { flex: 1, marginLeft: "260px", padding: "32px", maxWidth: "calc(100% - 260px)" };
const glassCard = { background: "rgba(26,10,46,0.4)", backdropFilter: "blur(16px)", borderRadius: "16px", padding: "32px", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" };
const sectionTitle = { fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "white" };
const statNumber = { fontSize: "48px", fontWeight: "bold", color: "#facc15", textShadow: "0 0 30px rgba(250,204,21,0.3)" };
const statLabel = { color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" };
const input = { width: "100%", background: "rgba(10,10,15,0.5)", border: "1px solid #374151", borderRadius: "8px", padding: "14px 16px", color: "white", fontSize: "15px", boxSizing: "border-box" };
const fileInputHidden = { display: "none" };
const fileSelectBox = { width: "100%", background: "rgba(10,10,15,0.5)", border: "2px dashed #facc15", borderRadius: "8px", padding: "24px 16px", color: "#facc15", textAlign: "center", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
const btnPrimary = { background: "#facc15", color: "#0a0a0f", fontWeight: "600", padding: "14px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "15px" };
const btnDisabled = { background: "#374151", color: "#6b7280", fontWeight: "600", padding: "14px 24px", borderRadius: "8px", border: "none", cursor: "not-allowed", fontSize: "15px" };
const deleteBtn = { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "14px", padding: "4px 8px" };
const actionBtn = { background: "#facc15", color: "#0a0a0f", fontWeight: "600", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px" };
const listItem = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(10,10,15,0.5)", borderRadius: "8px", padding: "16px" };
const mediaCard = { background: "rgba(10,10,15,0.5)", borderRadius: "12px", overflow: "hidden", border: "1px solid #1f2937" };
const mediaImg = { width: "100%", height: "180px", objectFit: "cover", display: "block" };