import React, { Suspense, useRef } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, useInView } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import Gallery from "./Gallery";
import StartProject from "./StartProject";

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
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between px-6 lg:px-16 py-5 items-center">
      <div className="flex items-center -ml-2 md:-ml-4">
        <img src="/logo.png" alt="Advertex Media Logo" className="h-16 md:h-24 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform invert brightness-200" />
      </div>

      <div className="hidden md:flex gap-8 items-center mr-8">
        {["Services", "Projects", "Contacts"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
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
    <section className="relative min-h-screen flex items-center md:items-end bg-hero-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-bg opacity-100 overflow-hidden" />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
      
      {/* Content container */}
      <div className="relative z-10 pointer-events-none w-full max-w-[100%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-12 md:pb-10 pt-24 md:pt-32">
        
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
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team collaborating" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 bg-background border border-border p-6 rounded-2xl shadow-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Award Winning</p>
                  <p className="text-muted-foreground text-sm">Agency of the Year 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function TestimonialsSection() {
  const testimonials = [
    { quote: "Advertex transformed our digital presence entirely. Their strategic approach to our campaign resulted in a 300% ROI within the first quarter.", author: "Sarah Jenkins", role: "CMO, TechFlow" },
    { quote: "The attention to detail and creative execution is unmatched. They don't just act like an agency, they act like a core partner in our business growth.", author: "Michael Chen", role: "Founder, Zenith AI" },
    { quote: "A world-class team. The e-commerce platform they designed and built broke all our previous sales records on launch day.", author: "Elena Rodriguez", role: "VP Marketing, Lumina" }
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
              <svg className="w-8 h-8 text-primary/50 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
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
          Let's build something extraordinary together. Drop us a line and our team will get back to you within 24 hours.
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
const AnimatedText = ({ text, className }) => {
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
  const images = [
    { src: "/images/work/IMG_6264.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_6265.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_6282.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_6293.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7026.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7141.JPG.jpeg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7459.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7462.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7478.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7482.jpg", alt: "Our Work Showcase" },
    { src: "/images/work/IMG_7483.jpg", alt: "Our Work Showcase" },
  ];

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
      
      <div className="w-full">
        <Carousel_001 
          className="px-4" 
          images={images} 
          showPagination={true} 
          showNavigation={true} 
          loop={true} 
          autoplay={true} 
        />
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
        <ServicesSection />
        <OurWorkSection />
        <FooterSection />
      </div>
    </ReactLenis>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<Gallery />} />
        <Route path="/start" element={<StartProject />} />
      </Routes>
    </BrowserRouter>
  );
}
