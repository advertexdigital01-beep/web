import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import BoomerangVideoBg from './BoomerangVideoBg';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgVideoUrls, setBgVideoUrls] = useState([
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4"
  ]);

  useEffect(() => {
    const fetchSettingsAndImages = async () => {
      try {
        // Fetch Video URL Settings
        const docRef = doc(db, 'site_settings', 'gallery');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.videoUrls && data.videoUrls.length > 0) {
            setBgVideoUrls(data.videoUrls);
          } else if (data.backgroundVideoUrl) {
            setBgVideoUrls([data.backgroundVideoUrl]);
          }
        }

        // Fetch Gallery Images
        const q = query(collection(db, 'gallery_images'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          src: doc.data().url,
          alt: "Our Work Showcase"
        }));
        
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
        console.error("Error fetching gallery data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettingsAndImages();
  }, []);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const oldBgUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sora">
      {/* Original Boomerang Background Video */}
      <div className="absolute inset-0 z-0">
        <BoomerangVideoBg src={oldBgUrl} />
      </div>
      
      {/* Dark gradient overlay so images pop more against the video */}
      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden">
        
        {/* Header / Nav */}
        <div className="sticky top-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Back to Home</span>
          </Link>
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase">Our Work</h1>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 md:p-12 pb-24 max-w-7xl mx-auto min-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-white/50 tracking-widest uppercase text-sm">Loading Masterpieces...</span>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {/* Render Videos First */}
              {bgVideoUrls.map((vidUrl, index) => {
                if (!vidUrl) return null;
                const isYouTube = vidUrl.includes('youtube.com') || vidUrl.includes('youtu.be');
                const ytId = isYouTube ? getYouTubeId(vidUrl) : null;
                
                return (
                  <motion.div 
                    key={`video-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-video mb-6"
                  >
                    {isYouTube && ytId ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&mute=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                        className="w-full h-full object-cover"
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                      />
                    ) : !isYouTube ? (
                      <BoomerangVideoBg src={vidUrl} />
                    ) : null}
                  </motion.div>
                );
              })}

              {/* Render Images */}
              {images.map((img, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
