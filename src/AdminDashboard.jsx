import React, { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc, addDoc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut, CheckCircle, Mail, Phone, Clock, FileText, Image as ImageIcon, MessageSquare, Upload, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' or 'gallery'
  
  const [inquiries, setInquiries] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const hasMigrated = useRef(false);

  const [videoUrl, setVideoUrl] = useState('');
  const [savingVideo, setSavingVideo] = useState(false);

  // Fetch Inquiries
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const q = query(collection(db, 'project_inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Fetch Gallery Images
  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const q = query(collection(db, 'gallery_images'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGallery(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  // Fetch Settings (Video URL)
  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'site_settings', 'gallery');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVideoUrl(docSnap.data().backgroundVideoUrl || '');
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchGallery();
    fetchSettings();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  // --- Inquiry Handlers ---
  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await deleteDoc(doc(db, 'project_inquiries', id));
        setInquiries(inquiries.filter(inq => inq.id !== id));
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const handleMarkRead = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'project_inquiries', id), {
        read: !currentStatus
      });
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, read: !currentStatus } : inq
      ));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // --- Gallery Handlers ---
  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    let newImages = [];
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let uploadedBytesBeforeCurrent = 0;

    for (const file of files) {
      try {
        const data = await new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "website");
          formData.append("cloud_name", "ndpct9uz");

          const xhr = new XMLHttpRequest();
          xhr.open("POST", "https://api.cloudinary.com/v1_1/ndpct9uz/image/upload");
          
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
               const overallLoaded = uploadedBytesBeforeCurrent + e.loaded;
               const percent = Math.min(100, Math.round((overallLoaded / totalSize) * 100));
               setUploadProgress(percent);
            }
          };
          
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error("Cloudinary upload failed"));
            }
          };
          
          xhr.onerror = () => reject(new Error("Network Error"));
          xhr.send(formData);
        });
        
        uploadedBytesBeforeCurrent += file.size;
        
        if (data.secure_url) {
          // Inject f_auto,q_auto to convert HEIC to web-safe formats (WebP/JPEG) and optimize size
          let optimizedUrl = data.secure_url;
          if (optimizedUrl.includes('/upload/')) {
            optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto/');
          }

          // Save to Firestore
          const docRef = await addDoc(collection(db, 'gallery_images'), {
            url: optimizedUrl,
            createdAt: serverTimestamp()
          });
          
          newImages.push({ id: docRef.id, url: optimizedUrl });
        }
      } catch (err) {
        console.error("Upload error for file", file?.name, err);
        alert(`Failed to upload image: ${err.message}. If this says 'Missing or insufficient permissions', you need to update your Firebase Security Rules!`);
      }
    }
    
    // Update local state with all successfully uploaded images
    if (newImages.length > 0) {
      setGallery(prev => [...newImages, ...prev]);
    }

    setUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm('Remove this image from the gallery?')) {
      try {
        await deleteDoc(doc(db, 'gallery_images', id));
        setGallery(gallery.filter(img => img.id !== id));
      } catch (err) {
        console.error("Error deleting image:", err);
        alert(`Failed to delete: ${err.message}`);
      }
    }
  };

  const handleSaveVideo = async () => {
    setSavingVideo(true);
    try {
      await setDoc(doc(db, 'site_settings', 'gallery'), {
        backgroundVideoUrl: videoUrl,
        updatedAt: serverTimestamp()
      }, { merge: true });
      alert("Background video URL saved successfully!");
    } catch (err) {
      console.error("Error saving video URL:", err);
      alert(`Failed to save video URL: ${err.message}. If this says missing permissions, please update your Firebase Rules for site_settings!`);
    }
    setSavingVideo(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sora p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#111111] p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div>
              <h1 className="text-3xl font-light">Admin Portal</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your website content and leads.</p>
            </div>
            
            <div className="flex gap-2 bg-black/50 p-1.5 rounded-xl border border-white/5 w-fit">
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'inquiries' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <MessageSquare size={16} />
                Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'gallery' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <ImageIcon size={16} />
                Gallery
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-colors border border-red-500/20 whitespace-nowrap"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>

        {/* Tab Content: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {loadingInquiries ? (
              <div className="text-center py-20 text-gray-500">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-20 bg-[#111111] rounded-2xl border border-white/5 text-gray-500">
                No inquiries found.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {inquiries.map((inq) => (
                  <div key={inq.id} className={`bg-[#111111] border rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 ${inq.read ? 'border-white/5 opacity-70' : 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
                    {!inq.read && (
                      <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full m-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-medium mb-1 truncate pr-6">{inq.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                        <Clock size={12} />
                        {inq.createdAt.toLocaleDateString()} at {inq.createdAt.toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                        <div className="p-2 bg-white/5 rounded-lg"><Mail size={16} /></div>
                        <span className="truncate">{inq.email}</span>
                      </a>
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                        <div className="p-2 bg-white/5 rounded-lg"><Phone size={16} /></div>
                        <span>{inq.phone}</span>
                      </a>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="p-2 bg-white/5 rounded-lg"><FileText size={16} /></div>
                        <span className="capitalize">{inq.projectType || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="bg-black/50 p-4 rounded-xl mb-6 border border-white/5">
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {inq.details || 'No additional details provided.'}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleMarkRead(inq.id, inq.read)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${inq.read ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                      >
                        <CheckCircle size={16} />
                        {inq.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors border border-red-500/10"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-10">
            {/* Background Video Section */}
            <div className="bg-[#151515] p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-medium text-white mb-2">Highlight Background Video</h2>
              <p className="text-sm text-gray-400 mb-4">
                Paste a YouTube URL or a direct video link (.mp4). This video will play silently at the very top of the Our Work page.
              </p>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  onClick={handleSaveVideo}
                  disabled={savingVideo}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {savingVideo ? <Loader2 size={18} className="animate-spin" /> : 'Save Video'}
                </button>
              </div>
            </div>

            {/* Gallery Images Section */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Our Work Gallery Grid</h2>
                  <p className="text-sm text-gray-400">Upload new images to Cloudinary to display on the website.</p>
                </div>
              
              <div>
                <input 
                  type="file" 
                  accept="image/*,.heic,.HEIC" 
                  multiple
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleUploadImage}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="relative overflow-hidden flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-90 w-48"
                >
                  {uploading && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-blue-500/20 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  )}
                  {uploading ? <Loader2 size={18} className="animate-spin relative z-10" /> : <Upload size={18} className="relative z-10" />}
                  <span className="relative z-10">
                    {uploading ? `Uploading ${uploadProgress}%` : 'Upload Image'}
                  </span>
                </button>
              </div>
            </div>

            {loadingGallery ? (
              <div className="text-center py-20 text-gray-500">Loading gallery...</div>
            ) : gallery.length === 0 ? (
              <div className="text-center py-20 bg-[#111111] rounded-2xl border border-white/5 text-gray-500">
                No images in gallery. Upload one to get started.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {gallery.map((img) => (
                  <div key={img.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] border border-white/10">
                    <img 
                      src={img.url} 
                      alt="Gallery Item" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleDeleteImage(img.id)}
                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                        title="Delete Image"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
