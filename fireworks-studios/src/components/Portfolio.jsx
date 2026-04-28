import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryApi } from '../api/mongodb';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryApi.getAll()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section id="portfolio" className="section py-20 bg-dark-purple">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-center mb-12 gold-gradient-text">
          Portfolio
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center col-span-3">No media yet</p>
          ) : (
            items.map((item, i) => (
              <motion.div
                key={item.id || i}
                variants={itemVariants}
                className="aspect-video bg-dark rounded-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              >
                {item.type === 'video' ? (
                  <video src={item.url} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}