import React from 'react';
import Gallery from '../Gallery';

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Our <span className="text-primary">Projects</span></h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
          Explore our portfolio of recent work. From digital campaigns and web development to brand design, see how we've helped businesses achieve their vision.
        </p>
      </div>
      
      {/* We reuse the robust Gallery component which has the DB integration */}
      <Gallery />
    </div>
  );
}
