import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden">
      {/* Hero Section - Unique Typography Focus */}
      <section className="relative pt-40 pb-24 px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6">Behind the Brand</p>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85] mb-8 mix-blend-difference">
            We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Digital Legacy</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Advertex isn't just an agency. We are a collective of digital architects, crafting systems that scale and stories that captivate.
          </p>
        </motion.div>
        
        {/* Background abstract element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Full Width Image Break */}
      <section className="w-full h-[60vh] md:h-[80vh] relative mb-32">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Advertex Team" 
          className="w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute z-20 bottom-12 right-12 md:bottom-24 md:right-24 bg-background/30 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-sm">
          <p className="text-2xl font-bold mb-2">"Culture eats strategy for breakfast."</p>
          <p className="text-muted-foreground">— Peter Drucker</p>
        </div>
      </section>

      {/* Split Content Section - Mission & Vision */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Our <span className="text-primary">Mission</span></h2>
            <div className="w-full h-[1px] bg-white/10 relative">
              <div className="absolute top-0 left-0 w-1/3 h-full bg-primary" />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              To empower visionaries by transforming their boldest ideas into tangible digital realities. We engineer growth through uncompromising design, cutting-edge technology, and data-driven psychology.
            </p>
          </div>
          
          <div className="flex-1 space-y-8 mt-12 md:mt-32">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Our <span className="text-primary">Vision</span></h2>
            <div className="w-full h-[1px] bg-white/10 relative">
              <div className="absolute top-0 left-0 w-1/3 h-full bg-primary" />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              To redefine the standard of digital excellence globally. We see a future where brands don't just exist online—they live, breathe, and interact dynamically with their audiences.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles - Unique Grid Layout */}
      <section className="bg-white/5 py-32 px-6 md:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">The Advertex <span className="text-primary">Edge</span></h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">The foundational principles that guide every pixel we push and line of code we write.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-10 rounded-[2rem] border border-white/10 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Zap className="w-8 h-8 text-primary group-hover:text-background transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Relentless Innovation</h3>
              <p className="text-muted-foreground">We refuse to rely on yesterday's solutions. Our team is constantly researching, iterating, and inventing new ways to solve complex problems.</p>
            </div>
            
            <div className="bg-background p-10 rounded-[2rem] border border-white/10 group hover:-translate-y-2 transition-transform duration-300 md:mt-12">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Shield className="w-8 h-8 text-primary group-hover:text-background transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Radical Transparency</h3>
              <p className="text-muted-foreground">No smoke and mirrors. We build trust through absolute clarity in our processes, pricing, and performance metrics.</p>
            </div>
            
            <div className="bg-background p-10 rounded-[2rem] border border-white/10 group hover:-translate-y-2 transition-transform duration-300 md:mt-24">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Target className="w-8 h-8 text-primary group-hover:text-background transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Precision Execution</h3>
              <p className="text-muted-foreground">A great strategy is nothing without flawless execution. We pride ourselves on pixel-perfect design and rock-solid engineering.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
