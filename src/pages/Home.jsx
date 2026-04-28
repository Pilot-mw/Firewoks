import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Music from '../components/Music';
import Portfolio from '../components/Portfolio';
import Booking from '../components/Booking';
import Contact from '../components/Contact';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingsApi } from '../api/mongodb';

function NotificationBell() {
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const checkBookings = async () => {
      try {
        const bookings = await bookingsApi.getAll();
        const pending = bookings.filter(b => b.status === 'pending');
        setNotifications(pending);
        setHasNew(pending.length > 0);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    checkBookings();
    const interval = setInterval(checkBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        onClick={() => setShowPopup(!showPopup)}
        style={bellButton}
      >
        🔔
        {hasNew && <span style={badge}>{notifications.length}</span>}
      </button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={popup}
          >
            <div style={popupHeader}>
              <span>Notifications</span>
              <span style={popupCount}>{notifications.length} new</span>
            </div>
            <div style={popupList}>
              {notifications.length === 0 ? (
                <p style={emptyText}>No new notifications</p>
              ) : (
                notifications.map((booking) => (
                  <div key={booking._id} style={notifItem}>
                    <div style={notifIcon}>📅</div>
                    <div>
                      <div style={notifTitle}>{booking.name}</div>
                      <div style={notifDesc}>{booking.service} - {booking.date}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const bellButton = {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: "#facc15",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0 4px 24px rgba(250,204,21,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const badge = {
  position: "absolute",
  top: "-4px",
  right: "-4px",
  background: "#ef4444",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popup = {
  position: "fixed",
  bottom: "90px",
  right: "24px",
  width: "320px",
  background: "rgba(10,10,15,0.95)",
  backdropFilter: "blur(16px)",
  borderRadius: "12px",
  border: "1px solid #1f2937",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  overflow: "hidden",
  zIndex: 9999,
};

const popupHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderBottom: "1px solid #1f2937",
  color: "white",
  fontWeight: "600",
};

const popupCount = {
  color: "#facc15",
  fontSize: "13px",
};

const popupList = {
  maxHeight: "300px",
  overflowY: "auto",
};

const emptyText = {
  padding: "24px",
  textAlign: "center",
  color: "#6b7280",
};

const notifItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderBottom: "1px solid #1f2937",
};

const notifIcon = {
  fontSize: "20px",
};

const notifTitle = {
  color: "white",
  fontWeight: "500",
  fontSize: "14px",
};

const notifDesc = {
  color: "#6b7280",
  fontSize: "13px",
};

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Music />
      <Portfolio />
      <Booking />
      <Contact />
      <NotificationBell />
    </div>
  );
}