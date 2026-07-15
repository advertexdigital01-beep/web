import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicesData = [
  {
    title: "Digital Marketing",
    items: ["Digital Strategy", "Social Media Marketing", "Campaign Management", "Influencer Marketing", "Media Planning and Buying", "Search Engine Optimization", "Google Ads / Meta Ads", "Lead Generation", "Whatsapp Promotion"]
  },
  {
    title: "Web Design",
    items: ["UI/UX Design", "Website Development", "E-Commerce", "Website Maintenance", "Website Copy", "Web Apps and Portals", "Third-Party Integrations", "Widgets", "Server Management"]
  },
  {
    title: "Design Services",
    items: ["Flyers", "Poster", "Brochures", "Logos", "Calendar & Dairy's", "Promotional Products", "Copy Writing", "Event Designs", "Special day Designs"]
  },
  {
    title: "Print Media",
    items: ["Printing & Designing", "Offset Printing", "Digital Printing", "Signage Boards", "All type of Boards", "Stickers", "Labels", "Notice Board", "Pamphlets"]
  },
  {
    title: "PR",
    items: ["Press Releases", "Event & Experiential PR", "Strategic Brand Communications", "Corporate & Start-up Profiling", "Social Media Campaigns", "Press Conferences", "TV Interviews", "News Paper / Magazine", "Media Relations"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Our <span className="text-primary">Services</span></h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
          We provide comprehensive marketing and design solutions tailored to elevate your brand. From cutting-edge digital campaigns to premium print media, our team of experts delivers excellence at every step.
        </p>
      </div>

      <div className="space-y-24">
        {servicesData.map((service, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/10 pt-12">
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-4">{service.title}</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground">
                We craft specialized strategies and deliver impactful execution across all facets of {service.title.toLowerCase()} to ensure your brand stands out and achieves its goals.
              </p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 text-center bg-white/5 p-12 md:p-24 rounded-3xl border border-white/10 relative overflow-hidden group">
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
