import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, Loader2Icon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    services: '',
    details: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    
    try {
      await addDoc(collection(db, 'project_inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus('error');
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-hero-bg font-sora text-foreground relative overflow-hidden flex flex-col">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[40vh] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

      {/* Nav */}
      <div className="p-6 relative z-10 max-w-5xl mx-auto w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-semibold tracking-wide">Back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 relative z-10 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {status === 'success' ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"
              >
                <CheckCircleIcon className="w-10 h-10" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for reaching out, {formData.name.split(' ')[0]}. Our team will review your project details and get back to you shortly.
              </p>
              <Link to="/">
                <button className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:brightness-90 transition-all">
                  Return to Home
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Let's build something <span className="text-primary">great</span>.</h1>
                <p className="text-muted-foreground">Tell us a bit about your project and we'll get right back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/80">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/80">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Company / Brand</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Acme Corp" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Services Interested In *</label>
                  <input required type="text" name="services" value={formData.services} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. Digital Marketing, Web Design" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Project Details *</label>
                  <textarea required name="details" value={formData.details} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" placeholder="Tell us about your goals and what you're looking to achieve..."></textarea>
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                    {errorMsg}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2Icon className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
