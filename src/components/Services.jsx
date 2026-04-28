import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const services = [
  { icon: '🎵', title: 'Recording', desc: 'Professional audio recording services' },
  { icon: '🎚️', title: 'Mixing', desc: 'Expert mixing to perfect your sound' },
  { icon: '🎧', title: 'Mastering', desc: 'Final polish for your tracks' },
  { icon: '🎥', title: 'Video Production', desc: 'Cinematic video production' },
  { icon: '📹', title: 'Event Coverage', desc: 'Weddings, events, and more' },
  { icon: '🎬', title: 'Post-Production', desc: 'Editing and visual effects' }
];

export default function Services() {
  return (
    <section id="services" className="section py-20 bg-dark-purple">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-center mb-12 gold-gradient-text">
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-dark/50 backdrop-blur-lg rounded-2xl p-8 text-center hover:border-gold/50 border border-transparent transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
