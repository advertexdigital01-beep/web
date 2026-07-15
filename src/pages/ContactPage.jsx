import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Contact <span className="text-primary">Us</span></h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
          Ready to elevate your brand? Get in touch with us to discuss your project, and let's create something extraordinary together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-6">Headquarters</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-bold mb-1">Advertex Media</p>
                  <p className="text-muted-foreground">123 Creative Street<br />Coimbatore, Tamil Nadu 641001<br />India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <p className="text-muted-foreground">hello@advertexmedia.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-bold text-xs">
                IG
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-bold text-xs">
                IN
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-bold text-xs">
                FB
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold uppercase tracking-widest mb-8">Send a Message</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-bold uppercase tracking-widest">First Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Last Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Message</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
            </div>
            
            <button type="submit" className="w-full bg-primary text-primary-foreground hover:brightness-110 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
