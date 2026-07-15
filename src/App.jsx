import React, { Suspense, useRef, useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, useInView } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ChevronLeftIcon, ChevronRightIcon, Menu, X } from "lucide-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import Gallery from "./Gallery";
import StartProject from "./StartProject";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Shadcn-like Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        navCta: "text-foreground bg-nav-button hover:bg-nav-button/80 active:scale-[0.97] transition-all",
        hero: "bg-primary text-primary-foreground hover:brightness-110 transition-all active:scale-[0.97]",
        heroOutline: "bg-white text-background hover:brightness-90 transition-all active:scale-[0.97]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between px-6 lg:px-16 py-5 items-center">
        <div className="flex items-center -ml-2 md:-ml-4">
          <img src="/logo.png" alt="Advertex Media Logo" className="h-16 md:h-24 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform invert brightness-200" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center mr-8">
          {["Home", "Services", "About Us", "Contacts"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col px-6 py-8">
          <div className="flex justify-between items-center mb-16">
            <img src="/logo.png" alt="Advertex Media Logo" className="h-16 w-auto object-contain drop-shadow-lg invert brightness-200" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 items-start pl-4">
            {["Home", "Services", "About Us", "Contacts"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors uppercase tracking-tighter"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative md:min-h-screen flex flex-col justify-start md:justify-end bg-hero-bg overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile ? (
          <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
            <Spline
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
              className="w-full h-full pointer-events-none"
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
            {/* Extremely lightweight CSS animation for mobile */}
            <div className="absolute top-[10%] left-[5%] w-[70vw] h-[70vw] bg-green-500/20 rounded-full filter blur-[80px] animate-blob" />
            <div className="absolute top-[40%] right-[5%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full filter blur-[80px] animate-blob" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[10%] left-[20%] w-[80vw] h-[80vw] bg-purple-500/20 rounded-full filter blur-[80px] animate-blob" style={{ animationDelay: '4s' }} />
          </div>
        )}
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
      
      {/* Content container */}
      <div className="relative z-10 pointer-events-none w-full max-w-[100%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-16 md:pb-10 pt-32 md:pt-32">
        
        <h1 
          className="text-[clamp(1.5rem,9vw,6rem)] font-bold leading-[1.05] tracking-tighter md:tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase opacity-0 animate-fade-up whitespace-nowrap md:whitespace-normal"
          style={{ animationDelay: '0.2s' }}
        >
          TRANSFORMING <br className="md:hidden" /><span className="text-primary">BRANDS</span>
        </h1>
        
        <p 
          className="text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          We help businesses grow through strategy.
        </p>
        
        <p 
          className="text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.55s' }}
        >
          Whether you're an age old business or a budding entrepreneur with big dreams, we've got you covered. Our mission is to transform your visions into realities, connecting you with audiences of all shapes and sizes in the digital landscape. Join us on this exhilarating journey as we redefine the future of marketing, one success story at a time. Advertex : Where your success is our passion
        </p>
        
        <div 
          className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up pointer-events-auto"
          style={{ animationDelay: '0.7s' }}
        >
          <Link to="/start" className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] text-center block">
            Start Your Project
          </Link>
          <Link to="/work" className="flex-1 md:flex-none border border-white/20 hover:bg-white/5 text-foreground px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-center block">
            View Our Work
          </Link>
        </div>
        
        <p 
          className="text-muted-foreground/60 text-xs font-light mt-4 md:mt-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.85s' }}
        >
          Trusted marketing partner. Coimbatore, TN. 100+ Brands Served.
        </p>

      </div>
    </section>
  );
}

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
    items: ["News Paper", "Magazines", "Flyers", "Brochures"]
  },
  {
    title: "Content Marketing",
    items: ["Content Research", "Content Strategy", "Social Media Content", "SEO-based Writing", "Internal Communication", "Long Format Writing", "Websites, PPTs, Investor Decks", "Editing and Proofing"]
  },
  {
    title: "Video Production",
    items: ["Product Photoshoots", "Explanatory Videos", "Animated Videos", "Reels/Shorts", "Inaugural Shoots", "Events Shoots/Teasers", "360 degree office shoots", "Interviews", "Social Media Gifs"]
  },
  {
    title: "Outdoor - Media",
    items: ["Bill Boards/Hoardings", "Bus Shelters", "Railway stations", "Medians", "Traffic Barricades", "Gas Ballon", "Pole Brandings", "No Parking Board", "Flyer Distribution"]
  },
  {
    title: "Out of Home",
    items: ["Digital Screens", "Theater Advertising", "Mall Advertising", "Look Walkers"]
  }
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 md:px-16 relative overflow-hidden bg-white">
      {/* Background Layer: Liquid Glass Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-left layered gradient glow (Optimized blurs) */}
        <div className="absolute top-[-5%] left-[-10%] w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-[#60B1FF] rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-30 md:opacity-20 transform-gpu" />
        <div className="absolute top-[10%] left-[5%] w-[60vw] md:w-[30vw] h-[60vw] md:h-[30vw] bg-[#319AFF] rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-30 md:opacity-20 transform-gpu" />
        
        {/* The Glassy Orb - Hidden on mobile for performance */}
        <div className="hidden md:block absolute top-[20%] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-auto md:-translate-x-0 md:right-[-5%] w-[140vw] md:w-[50vw] mix-blend-multiply pointer-events-none opacity-50 md:opacity-80">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto scale-100 md:scale-125 origin-center transform-gpu"
            style={{ filter: 'invert(1) hue-rotate(160deg) saturate(200%) brightness(1.1)' }}
          >
            <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
          </video>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-slate-900 uppercase tracking-tight flex flex-wrap gap-x-[0.3em]">
          <AnimatedText text="Our" />
          <AnimatedText text="Services" className="text-[#0084ff]" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((category, idx) => (
            <div key={idx} className="bg-white/40 backdrop-blur-[50px] border border-slate-200 p-8 rounded-[16px] hover:bg-white/60 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.04)] shadow-inner-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]">
              <h3 className="text-xl font-semibold mb-6 text-slate-900 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] shadow-[0_0_8px_rgba(0,132,255,0.5)]" />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-start gap-2">
                    <span className="text-[#0084ff] mt-1 opacity-60">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about-us" className="py-24 md:py-32 px-6 md:px-16 bg-hero-bg relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-foreground leading-[1.1] tracking-tighter uppercase mb-4">
              Featured <br /><span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              A glimpse into our recent successful campaigns and brand transformations.
            </p>
          </div>
          <Link to="/projects">
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all whitespace-nowrap">
              View Full Portfolio
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.04em] text-foreground mb-8 flex flex-col items-start gap-[0.1em]">
              <AnimatedText text="We don't just follow trends." />
              <AnimatedText text="We set them." className="text-primary" />
            </h2>
            <p className="text-muted-foreground text-lg font-light mb-10 max-w-lg">
              Since 2018, Advertex has partnered with visionary brands to build systems that scale. We blend data-driven strategy with breathtaking creative to deliver results that matter.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: "Advertex transformed our digital presence entirely.", author: "Sarah Jenkins", role: "CMO, TechFlow" },
    { quote: "The attention to detail and creative execution is unmatched.", author: "Michael Chen", role: "Founder, Zenith AI" },
    { quote: "A world-class team.", author: "Elena Rodriguez", role: "VP Marketing, Lumina" }
  ];

  return (
    <section id="team" className="py-24 md:py-32 px-6 md:px-16 bg-background relative border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-sm text-primary uppercase tracking-[0.3em] font-bold mb-16 flex justify-center">
          <AnimatedText text="Client Stories" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-muted/30 border border-border p-10 rounded-2xl">
              <p className="text-foreground text-lg font-light leading-relaxed mb-8">{t.quote}</p>
              <div>
                <p className="font-bold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer id="contacts" className="bg-hero-bg relative pt-32 pb-10 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-bold text-foreground uppercase tracking-tighter leading-[0.9] mb-8 flex flex-col items-center gap-[0.1em]">
          <AnimatedText text="Ready to" />
          <AnimatedText text="Transform?" className="text-primary" />
        </h2>
        <p className="text-muted-foreground text-xl max-w-2xl mb-12">
          Let's build something extraordinary together.
        </p>
        <Link to="/start">
          <button className="bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all rounded-full px-12 py-5 text-lg font-bold uppercase tracking-widest mb-24">
            Start a Project
          </button>
        </Link>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12 border-t border-border pt-16">
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Headquarters</h4>
            <p className="text-muted-foreground leading-relaxed">
              1/199, KAM Complex, North Street, <br />
              Kottaipalayam, Coimbatore, <br />
              Tamil Nadu, India - 641110
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Contact Us</h4>
            <p className="text-muted-foreground mb-3">
              <a href="mailto:advertexdigital01@gmail.com" className="hover:text-primary transition-colors">advertexdigital01@gmail.com</a>
            </p>
            <p className="text-muted-foreground flex flex-col gap-1">
              <a href="tel:+919994122362" className="hover:text-primary transition-colors">+91 99941 22362</a>
              <a href="tel:+919952222362" className="hover:text-primary transition-colors">+91 99522 22362</a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <h4 className="font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Social</h4>
             <div className="flex flex-col gap-2 text-muted-foreground">
               <a href="https://www.instagram.com/advertex_media?igsh=d2JrZGIzcDNxdTl1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
               <a href="https://www.facebook.com/share/14mPjKBecrm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
             </div>
          </div>
        </div>

        <div className="w-full border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Advertex Logo" className="h-8 invert brightness-200" />
            <span className="font-bold tracking-widest uppercase">Advertex</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Advertex Media. All rights reserved.</p>
        </div>
      </div>
      
      {/* Huge subtle background text */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[20vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap select-none">
        ADVERTEX
      </div>
    </footer>
  );
}

// --- SCROLL ANIMATION COMPONENTS ---
export const AnimatedText = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const words = text.split(" ");
  let charCount = 0;
  const wordsData = words.map(word => {
    const chars = word.split("").map(char => ({
      char,
      index: charCount++
    }));
    charCount++; // Account for space in index calculation
    return chars;
  });
  
  const centerIndex = Math.floor(text.length / 2);

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]", className)} style={{ perspective: "500px" }}>
      {wordsData.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap">
          {word.map((item, charIndex) => {
            const distanceFromCenter = item.index - centerIndex;
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={false}
                animate={isInView ? { opacity: 1, rotateX: 0, x: 0 } : { opacity: 0, rotateX: 90, x: distanceFromCenter * 40 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 0.1 
                }}
              >
                {item.char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

// --- SWIPER CAROUSEL COMPONENTS ---
const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}) => {
  const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  `;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("w-full max-w-5xl mx-auto relative", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.43 }
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-[250px] md:!h-[400px] w-full border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

function OurWorkSection() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery_images'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          src: doc.data().url,
          alt: "Our Work Showcase"
        }));
        
        // If empty (e.g. before migration), fall back to some defaults or show nothing
        if (data.length > 0) {
          setImages(data);
        } else {
          setImages([
            { src: "/images/work/IMG_6264.jpg", alt: "Our Work Showcase" },
            { src: "/images/work/IMG_6265.jpg", alt: "Our Work Showcase" },
            { src: "/images/work/IMG_6282.jpg", alt: "Our Work Showcase" }
          ]);
        }
      } catch (err) {
        console.error("Error fetching images for OurWorkSection:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16 text-center">
        <h2 className="text-sm text-primary uppercase tracking-[0.3em] font-bold mb-6 flex justify-center">
          <AnimatedText text="OUR WORK" />
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold text-slate-900">
          A glimpse into our <span className="text-[#0084ff]">creativity</span>
        </h3>
      </div>
      
      <div className="w-full min-h-[400px] flex items-center justify-center">
        {loading ? (
          <div className="text-gray-400 font-medium tracking-widest uppercase">Loading Gallery...</div>
        ) : (
          <Carousel_001 
            className="px-4" 
            images={images} 
            showPagination={true} 
            showNavigation={true} 
            loop={true} 
            autoplay={true} 
          />
        )}
      </div>
    </section>
  );
}

function LogoMarqueeSection() {
  const logos = [
    "/images/company/IMG_4667.PNG",
    "/images/company/IMG_5589.PNG",
    "/images/company/Screenshot_2026-07-14_201402-removebg-preview.png",
    "/images/company/svg.png",
  ];

  return (
    <section className="py-16 bg-[#0a0a0a] border-y border-white/5 overflow-hidden relative flex">
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap min-w-max items-center">
        {/* We duplicate the logo track 4 times so the infinite scroll is seamless even on ultra-wide monitors */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12 sm:gap-24 md:gap-48 px-8 md:px-24 items-center min-w-max">
            {logos.map((src, j) => (
              <img key={j} src={src} alt="Company Logo" className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain brightness-0 invert opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:scale-110 transition-all cursor-pointer" />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <ReactLenis root options={{ smoothTouch: false, lerp: 0.1, wheelMultiplier: 1.2 }}>
      <div className="bg-hero-bg min-h-screen font-sora overflow-x-hidden w-full">
        <Navbar />
        <HeroSection />
        <LogoMarqueeSection />
        <ServicesSection />
        <OurWorkSection />
        <FooterSection />
      </div>
    </ReactLenis>
  );
}

function Layout({ children }) {
  return (
    <ReactLenis root options={{ smoothTouch: false, lerp: 0.1, wheelMultiplier: 1.2 }}>
      <div className="bg-hero-bg min-h-screen font-sora overflow-x-hidden w-full flex flex-col">
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <FooterSection />
      </div>
    </ReactLenis>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919994122362"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.665-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FloatingWhatsApp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutUsPage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/contacts" element={<Layout><ContactPage /></Layout>} />
        <Route path="/work" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/start" element={<StartProject />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
