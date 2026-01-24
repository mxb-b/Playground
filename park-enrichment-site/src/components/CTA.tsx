import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Phone, Mail } from 'lucide-react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 bg-pe-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-12 lg:p-16"
            >
              <span className="inline-block bg-pe-medium-green/10 text-pe-medium-green px-4 py-2 rounded-full text-sm font-medium mb-6">
                Get Started
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready to Enrich Your Child's Future?
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Take the first step toward an amazing enrichment experience.
                Schedule a tour, speak with our team, or enroll today.
              </p>

              {/* Contact options */}
              <div className="space-y-4 mb-8">
                <motion.a
                  href="tel:555-123-4567"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-pe-cream rounded-xl hover:bg-pe-lighter-green/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-pe-medium-green rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Call us</div>
                    <div className="font-semibold text-gray-900">(555) 123-4567</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@parkenrichment.edu"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-pe-cream rounded-xl hover:bg-pe-lighter-green/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-pe-medium-green rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email us</div>
                    <div className="font-semibold text-gray-900">info@parkenrichment.edu</div>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-pe-cream rounded-xl hover:bg-pe-lighter-green/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-pe-medium-green rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Schedule</div>
                    <div className="font-semibold text-gray-900">Book a Tour</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-pe-dark-teal to-pe-medium-green p-8 sm:p-12 lg:p-16"
            >
              <h3 className="font-serif text-2xl font-bold text-white mb-6">
                Request Information
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                />

                <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/60 focus:outline-none focus:border-white/40 transition-colors">
                  <option value="">Select Program Interest</option>
                  <option value="afterschool">After-School Programs</option>
                  <option value="summer">Summer Camp</option>
                  <option value="both">Both</option>
                </select>

                <textarea
                  placeholder="Message (Optional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-pe-dark-teal px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Submit Request
                </motion.button>
              </form>

              <p className="text-white/60 text-sm mt-4 text-center">
                We'll respond within 24 hours
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
