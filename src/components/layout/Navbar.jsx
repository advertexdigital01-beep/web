import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'Work', 'Process', 'About'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md border-b border-borderGray py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-tight text-secondary">ADVERTEX</a>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-accent transition-colors">
              {link}
            </a>
          ))}
          <button className="bg-secondary text-primary px-6 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
            Let's Talk
          </button>
        </div>

        <button className="md:hidden text-secondary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-primary border-b border-borderGray shadow-subtle md:hidden flex flex-col items-center py-8 space-y-6"
          >
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                {link}
              </a>
            ))}
             <button className="bg-secondary text-primary px-8 py-3 rounded-full text-base font-medium">
                Let's Talk
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
