export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#0a0a0f' }}>
      <img src="/home.jpg" alt="Home" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '672px' }}>
          <h1 style={{ fontSize: '72px', fontWeight: '900', lineHeight: '1', marginBottom: '32px' }}>
            <span style={{ background: 'linear-gradient(to right, #facc15, #fef08a, #facc15)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FIREWORKS</span>
            <br />
            <span style={{ fontSize: '56px', color: 'white', letterSpacing: '0.3em' }}>STUDIOS</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#e5e7eb', marginBottom: '32px' }}>
            Where Sound Meets Vision, and <span style={{ color: '#facc15' }}>Creativity</span> Ignites.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: '#facc15', color: '#0a0a0f', fontWeight: '600', padding: '16px 32px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
              ≡ƒÄº Listen to Music
            </button>
            <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} style={{ border: '2px solid #facc15', color: '#facc15', background: 'transparent', fontWeight: '600', padding: '16px 32px', borderRadius: '9999px', cursor: 'pointer' }}>
              ≡ƒôà Book a Session
            </button>
          </div>
        </div>
      </div>

      <div onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(250,204,21,0.8)', cursor: 'pointer' }}>
        <div style={{ width: '24px', height: '40px', border: '2px solid rgba(250,204,21,0.5)', borderRadius: '9999px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
          <div style={{ width: '6px', height: '6px', background: '#facc15', borderRadius: '50%' }} />
        </div>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>Scroll Down</span>
      </div>
    </section>
  );
}
