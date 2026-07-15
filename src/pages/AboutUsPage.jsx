import React from 'react';
import { AnimatedText } from '../App';

export default function AboutUsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">About <span className="text-primary">Us</span></h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
          We are a team of passionate creators, strategists, and technologists dedicated to building extraordinary brands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.04em] text-foreground mb-8 flex flex-col items-start gap-[0.1em]">
            <span>We don't just follow trends.</span>
            <span className="text-primary">We set them.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-10 max-w-lg">
            Since 2018, Advertex has partnered with visionary brands to build systems that scale. We blend data-driven strategy with breathtaking creative to deliver results that matter. Our mission is to push boundaries and redefine what's possible in the digital space.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-4xl font-bold text-foreground mb-2">250+</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Clients</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-foreground mb-2">98%</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Client Retention</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-muted/20 rounded-[32px] border border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team collaborating" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
