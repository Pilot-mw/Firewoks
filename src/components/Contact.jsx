import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  return (
    <section id="contact" className="section py-20 bg-dark-purple">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl mb-12 gold-gradient-text">
          Get In Touch
        </motion.h2>
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-dark/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-2">📞</div>
            <div className="text-white font-medium">Phone</div>
            <div className="text-gray-400">+265 995 452 468</div>
          </div>
          <div className="bg-dark/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-2">✉️</div>
            <div className="text-white font-medium">Email</div>
            <div className="text-gray-400">info@fireworksstudios.com</div>
          </div>
          <div className="bg-dark/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-2">📍</div>
            <div className="text-white font-medium">Location</div>
            <div className="text-gray-400">Zomba, Chikanda near Come Again Complex</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
