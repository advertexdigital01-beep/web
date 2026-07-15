import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen relative">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Our <span className="text-primary">Services</span></h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
          We provide comprehensive marketing and design solutions tailored to elevate your brand. From cutting-edge digital campaigns to premium print media, our team of experts delivers excellence at every step.
        </p>
      </div>

      {/* Grid Layout mimicking the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {servicesData.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer isolate"
            onClick={() => setSelectedService(service)}
          >
            {/* Background Image */}
            <img 
              src={service.image} 
              alt={service.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay for text readability (dark at bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
            
            {/* Content positioned at bottom left */}
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">{service.title}</h2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/services/${service.id}`);
                }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:brightness-110 px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              >
                Know More <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center bg-white/5 p-12 md:p-24 rounded-3xl border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Let's discuss how our services can help transform your brand and drive actual results for your business.
          </p>
          <Link to="/start" className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:brightness-110 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
