import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const quickLinks = [
  { name: 'Programs', href: '#programs' },
  { name: 'Summer Camp', href: '#' },
  { name: 'After School', href: '#' },
  { name: 'Registration', href: '#contact' },
  { name: 'Calendar', href: '#' },
  { name: 'FAQs', href: '#' },
];

const resources = [
  { name: 'Parent Portal', href: '#' },
  { name: 'Staff Directory', href: '#' },
  { name: 'News & Events', href: '#' },
  { name: 'Career Opportunities', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src="./images/2026.Enrichment.logo_multigreen_HORIZ.png"
              alt="Park Enrichment"
              className="h-14 w-auto mb-6"
            />
            <p className="text-gray-400 mb-6 leading-relaxed">
              Inspiring young minds through innovative programs that nurture creativity, build confidence, and spark lifelong passions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pe-medium-green hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pe-lighter-green transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pe-lighter-green transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-pe-medium-green flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">
                  123 Park Avenue<br />
                  Baltimore, MD 21210
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-pe-medium-green flex-shrink-0" size={18} />
                <a href="tel:555-123-4567" className="text-gray-400 hover:text-pe-lighter-green transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-pe-medium-green flex-shrink-0" size={18} />
                <a href="mailto:info@parkenrichment.edu" className="text-gray-400 hover:text-pe-lighter-green transition-colors">
                  info@parkenrichment.edu
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="text-pe-medium-green flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Mon - Fri: 7:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} The Park School Enrichment. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                ♥
              </motion.span>
              <span>for our community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
