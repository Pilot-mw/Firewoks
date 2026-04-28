import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function LightFlare({ style }) {
  return (
    <div style={{
      ...flare,
      ...style,
    }}>
      <div style={flareInner} />
      <div style={flareGlow} />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section py-20 bg-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <LightFlare style={{ top: '10%', left: '5%', width: '300px', height: '300px' }} />
      <LightFlare style={{ bottom: '20%', right: '10%', width: '200px', height: '200px' }} />
      <LightFlare style={{ top: '40%', right: '20%', width: '150px', height: '150px', opacity: 0.5 }} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-center mb-12 gold-gradient-text">
          About Us
        </motion.h2>
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-gray-300 space-y-6 text-lg leading-relaxed">
          <p>At Fireworks Studios, we are proud to be part of Malawi's growing creative industry.</p>
          <p>We are an Audio and Video production studio dedicated to helping artists, brands, and individuals bring their ideas to life through powerful sound and visuals. From music recording, mixing and mastering, to weddings, events, and storytelling through film, we provide creative solutions that reflect both quality and authenticity.</p>
          <p>We understand the local culture, the sound, and the stories that matter. That's why we focus on producing content that connects with peopleΓÇönot just in Malawi, but beyond. Whether you're an upcoming artist chasing your first hit, a couple preserving a special moment, or a business building its brand, we are here to support your vision every step of the way.</p>
          <p className="text-gold font-semibold">At Fireworks Studios, we don't just createΓÇöwe ignite creativity.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

const flare = {
  position: 'absolute',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)',
  filter: 'blur(40px)',
  pointerEvents: 'none',
  animation: 'pulse 4s ease-in-out infinite',
};

const flareInner = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '60%',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(250,204,21,0.3) 0%, transparent 70%)',
};

const flareGlow = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20%',
  height: '20%',
  borderRadius: '50%',
  background: '#facc15',
  boxShadow: '0 0 60px 20px rgba(250,204,21,0.6)',
  animation: 'glow 2s ease-in-out infinite alternate',
};
