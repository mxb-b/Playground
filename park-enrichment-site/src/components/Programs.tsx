import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code, Music, Leaf, BookOpen, Trophy } from 'lucide-react';

const programs = [
  {
    icon: Palette,
    title: 'Visual Arts',
    description: 'Explore painting, sculpture, and digital art with professional artists. Express creativity through diverse mediums.',
    color: 'from-rose-500 to-pink-600',
    delay: 0,
  },
  {
    icon: Code,
    title: 'STEM & Robotics',
    description: 'Build robots, learn coding, and discover the wonders of science through hands-on experiments.',
    color: 'from-blue-500 to-indigo-600',
    delay: 0.1,
  },
  {
    icon: Music,
    title: 'Music & Performance',
    description: 'Learn instruments, join ensembles, and develop stage presence in our performing arts program.',
    color: 'from-amber-500 to-orange-600',
    delay: 0.2,
  },
  {
    icon: Leaf,
    title: 'Nature & Environment',
    description: 'Connect with nature through gardening, wildlife studies, and environmental stewardship.',
    color: 'from-pe-medium-green to-pe-dark-teal',
    delay: 0.3,
  },
  {
    icon: BookOpen,
    title: 'Language & Literature',
    description: 'Develop writing skills, explore world languages, and dive into creative storytelling.',
    color: 'from-purple-500 to-violet-600',
    delay: 0.4,
  },
  {
    icon: Trophy,
    title: 'Sports & Fitness',
    description: 'Stay active with team sports, martial arts, yoga, and fitness programs for all skill levels.',
    color: 'from-emerald-500 to-teal-600',
    delay: 0.5,
  },
];

function ProgramCard({ program }: { program: typeof programs[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = program.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: program.delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} text-white mb-6 shadow-lg group-hover:bg-white group-hover:text-pe-dark-teal transition-all duration-300`}>
          <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">
          {program.title}
        </h3>

        <p className="text-gray-600 group-hover:text-white/90 transition-colors leading-relaxed">
          {program.description}
        </p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-6 flex items-center text-pe-medium-green group-hover:text-white font-medium"
        >
          Learn more
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="programs" className="py-24 bg-pe-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block bg-pe-medium-green/10 text-pe-medium-green px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            Our Programs
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            Discover Your Passion
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From arts to sciences, sports to technology, our diverse programs help every child find their unique strengths.
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-pe-medium-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-pe-dark-teal transition-colors"
          >
            View All Programs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
