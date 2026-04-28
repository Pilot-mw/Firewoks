import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: isScrolled ? '12px 0' : '16px 0',
      background: isScrolled ? 'rgba(10,10,15,0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            ≡ƒöÑ Fireworks Studios
          </button>
          <div style={{ display: 'none' }} id="admin-btn">
            <a href="/admin" style={{ color: '#facc15', textDecoration: 'none' }}>Admin</a>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['HOME', 'ABOUT', 'SERVICES', 'MUSIC', 'PORTFOLIO', 'BOOKING', 'CONTACT'].map((link, i) => (
              <div key={link} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <div style={{ width: '1px', height: '14px', background: '#4b5563', margin: '0 4px' }} />}
                <button onClick={() => scrollTo(link === 'HOME' ? 'home' : link.toLowerCase())} style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', fontSize: '14px', padding: '6px 12px', borderRadius: '4px', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.background = 'rgba(250,204,21,0.2)'} onMouseOut={(e) => e.target.style.background = 'none'}>
                  {link}
                </button>
              </div>
            ))}
          </div>
          <a href="/admin" style={{ color: '#facc15', textDecoration: 'none', display: 'block' }}>
            Γÿ░
          </a>
        </div>
      </div>
    </nav>
  );
}
