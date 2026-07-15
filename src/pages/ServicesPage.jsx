import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = [
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Digital Strategy", "Social Media Marketing", "Campaign Management", "Influencer Marketing", "Media Planning and Buying", "Search Engine Optimization", "Google Ads / Meta Ads", "Lead Generation", "Whatsapp Promotion"]
  },
  {
    title: "Web Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["UI/UX Design", "Website Development", "E-Commerce", "Website Maintenance", "Website Copy", "Web Apps and Portals", "Third-Party Integrations", "Widgets", "Server Management"]
  },
  {
    title: "Design Services",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Flyers", "Poster", "Brochures", "Logos", "Calendar & Dairy's", "Promotional Products", "Copy Writing", "Event Designs", "Special day Designs"]
  },
  {
    title: "Print Media",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Printing & Designing", "Offset Printing", "Digital Printing", "Signage Boards", "All type of Boards", "Stickers", "Labels", "Notice Board", "Pamphlets"]
  },
  {
    title: "Public Relations",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Press Releases", "Event & Experiential PR", "Strategic Brand Communications", "Corporate & Start-up Profiling", "Social Media Campaigns", "Press Conferences", "TV Interviews", "News Paper / Magazine", "Media Relations"]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

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
                  setSelectedService(service);
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

      {/* Modal for Service Details */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <div className="h-48 sm:h-64 relative shrink-0">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 sm:p-10 overflow-y-auto">
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">{selectedService.title}</h3>
                <div className="w-12 h-1 bg-primary mb-8"></div>
                <p className="text-muted-foreground text-lg mb-8">
                  We craft specialized strategies and deliver impactful execution across all facets of {selectedService.title.toLowerCase()} to ensure your brand stands out and achieves its goals.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedService.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-light text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <Link to="/start" className="inline-flex items-center gap-3 w-full justify-center bg-primary text-primary-foreground hover:brightness-110 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all">
                    Start a Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
