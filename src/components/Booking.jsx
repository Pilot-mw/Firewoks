import { motion } from 'framer-motion';
import { useState } from 'react';
import { bookingsApi } from '../api/mongodb';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const videoTypes = ['Weddings', 'Engagements', 'Funeral Ceremonies', 'Church Events', 'Rallies', 'Documentaries', 'Music Videos', 'Advertisements'];

export default function Booking() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', videoType: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await bookingsApi.add(formData);
      setSubmitted(true);
      setError('');
      setFormData({ name: '', email: '', phone: '', service: '', videoType: '', date: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
    }
  };

  return (
    <section id="booking" className="section py-20 bg-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-center mb-12 gold-gradient-text">
          Book a Session
        </motion.h2>
        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6 bg-dark-purple/50 backdrop-blur-lg rounded-2xl p-8">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            required
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            required
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
          />
          <select
            name="service"
            value={formData.service}
            required
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
          >
            <option value="">Select Service</option>
            <option>Recording</option>
            <option>Mixing</option>
            <option>Mastering</option>
            <option>Video Production</option>
          </select>
          {formData.service === 'Video Production' && (
            <select
              name="videoType"
              value={formData.videoType}
              required
              onChange={handleChange}
              className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
            >
              <option value="">Specify Video Production Type</option>
              {videoTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
            </select>
          )}
          <input
            type="date"
            name="date"
            value={formData.date}
            required
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-dark/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dark text-dark font-bold py-3 rounded-lg transition-colors"
          >
            {submitted ? 'Booking Submitted!' : 'Submit Booking'}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}