import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Park Enrichment has been transformative for my daughter. She's discovered a love for robotics and made wonderful friends. The instructors truly care about each child's growth.",
    author: 'Sarah Mitchell',
    role: 'Parent of 3rd grader',
    avatar: 'SM',
  },
  {
    quote: "The art program here is exceptional. My son has blossomed creatively in ways I never expected. The supportive environment makes all the difference.",
    author: 'Michael Chen',
    role: 'Parent of 5th grader',
    avatar: 'MC',
  },
  {
    quote: "As a working parent, knowing my kids are in a safe, enriching environment after school gives me peace of mind. They actually look forward to staying!",
    author: 'Jennifer Adams',
    role: 'Parent of 2nd & 4th graders',
    avatar: 'JA',
  },
  {
    quote: "The summer camp changed our family's summers completely. My children come home every day excited to tell us about their adventures and discoveries.",
    author: 'David Park',
    role: 'Parent of 1st grader',
    avatar: 'DP',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-pe-dark-teal via-pe-medium-green to-pe-light-green relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            What Families Say
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hear from parents whose children have thrived in our programs.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl relative"
          >
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 bg-pe-medium-green rounded-2xl p-4 shadow-lg">
              <Quote className="text-white" size={24} />
            </div>

            <blockquote className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 mt-4">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pe-medium-green to-pe-dark-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                {testimonials[currentIndex].avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-gray-500">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
