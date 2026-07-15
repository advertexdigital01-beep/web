import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase mb-4">Service Not Found</h1>
          <Link to="/services" className="text-primary hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] mb-16">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-16 max-w-7xl mx-auto pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/services" className="text-sm font-bold text-primary uppercase tracking-widest mb-6 inline-flex items-center gap-2 hover:brightness-110 transition-colors">
              ← Back to all services
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-white">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-6">What We Do</h2>
            <div className="w-12 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We craft specialized strategies and deliver impactful execution across all facets of {service.title}. Our dedicated approach ensures your brand stands out, connects with the right audience, and achieves measurable growth.
            </p>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.items.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-foreground text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-32 text-center bg-white/5 p-12 md:p-24 rounded-3xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Let's Elevate Your Brand</h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto">
              Ready to harness the power of {service.title}? Get in touch with our team to start your project.
            </p>
            <Link to="/start" className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:brightness-110 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
