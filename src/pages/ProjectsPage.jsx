import React from 'react';
import Gallery from '../Gallery';

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* We reuse the robust Gallery component which has the DB integration */}
      <Gallery />
    </div>
  );
}
