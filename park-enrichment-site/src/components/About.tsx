import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Target, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Nurturing Environment',
    description: 'Every child feels safe, valued, and encouraged to explore their potential.',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Programs tailored to individual interests, learning styles, and developmental stages.',
  },
  {
    icon: Award,
    title: 'Excellence in Education',
    description: 'Highly qualified instructors passionate about inspiring young minds.',
  },
  {
    icon: Users,
    title: 'Community Focus',
    description: 'Building connections between families, educators, and the broader community.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder gradient for image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-pe-light-green to-pe-dark-teal flex items-center justify-center">
                <img
                  src="./images/2026.Enrichment.logo_multigreen_SQUARE.png"
                  alt="Park School Enrichment"
                  className="w-2/3 h-auto"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="text-4xl font-bold text-pe-medium-green">15+</div>
              <div className="text-gray-600 font-medium">Years of Excellence</div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pe-cream rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-8 w-16 h-16 bg-pe-lighter-green/30 rounded-full -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block bg-pe-medium-green/10 text-pe-medium-green px-4 py-2 rounded-full text-sm font-medium mb-6">
              About Us
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Where Every Child's
              <span className="text-pe-medium-green"> Potential Blossoms</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Since our founding, The Park School Enrichment has been dedicated to providing
              exceptional after-school and summer programs that go beyond traditional education.
              We believe every child deserves the opportunity to discover their passions,
              develop new skills, and build lasting friendships.
            </p>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Our experienced educators create engaging, hands-on experiences that spark
              curiosity and foster a love of learning that extends far beyond the classroom.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-pe-cream rounded-xl flex items-center justify-center">
                    <value.icon className="text-pe-medium-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
