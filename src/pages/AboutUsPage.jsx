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
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Creative team collaborating" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
          </div>
        </div>
      </div>

      {/* New Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border-t border-white/10 pt-16">
        <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Our Mission</h3>
          <div className="w-12 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To empower brands by providing innovative, data-driven, and highly creative marketing solutions. We believe in crafting stories that resonate and building digital ecosystems that generate measurable growth. Every campaign we launch is designed to leave a lasting impact on your audience.
          </p>
        </div>
        <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Our Vision</h3>
          <div className="w-12 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To be the world's most sought-after creative agency, recognized for pushing the limits of technology and design. We envision a future where brand interactions are seamless, immersive, and fundamentally human—bridging the gap between businesses and consumers through authentic digital experiences.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-12 text-center">Our Core <span className="text-primary">Values</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors bg-white/5">
            <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Innovation</h4>
            <p className="text-muted-foreground font-light">We constantly explore new technologies and design paradigms to stay ahead of the curve and offer cutting-edge solutions.</p>
          </div>
          <div className="border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors bg-white/5">
            <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Transparency</h4>
            <p className="text-muted-foreground font-light">Honesty and open communication form the bedrock of our client relationships. We keep you informed at every step.</p>
          </div>
          <div className="border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors bg-white/5">
            <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Excellence</h4>
            <p className="text-muted-foreground font-light">We don't settle for "good enough." Our team is dedicated to delivering premium, flawless execution across all projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
