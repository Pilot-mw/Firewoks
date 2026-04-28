import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tracksApi } from '../api/mongodb';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tracksApi.getAll()
      .then(setTracks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section id="music" className="section py-20 bg-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-center mb-12 gold-gradient-text">
          Music
        </motion.h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {tracks.length === 0 ? (
            <p className="text-gray-400 text-center">No tracks yet</p>
          ) : (
            tracks.map((track, i) => (
              <motion.div
                key={track.id || i}
                variants={itemVariants}
                className="bg-dark-purple/50 backdrop-blur-lg rounded-xl p-6 flex items-center justify-between hover:border-gold/50 border border-transparent transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎵</span>
                  <div>
                    <div className="text-white font-medium">{track.title}</div>
                    <div className="text-gray-400 text-sm">{track.artist}</div>
                  </div>
                </div>
                {track.url ? (
                  <audio controls src={track.url} className="h-8" />
                ) : (
                  <button className="text-gold hover:text-gold-light transition-colors">▶</button>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}