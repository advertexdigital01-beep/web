import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut, CheckCircle, Mail, Phone, Clock, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'project_inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to Date
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      // In case security rules block or other error
      if (err.message.includes('Missing or insufficient permissions')) {
        alert("Permission denied. Ensure your Firestore Security Rules allow read access for authenticated admins.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleDelete = async (id) => {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sora p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111111] p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-3xl font-light">Lead Management</h1>
            <p className="text-gray-400 text-sm mt-1">View and manage project inquiries.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-colors border border-red-500/20"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-2xl border border-white/5 text-gray-500">
            No inquiries found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {inquiries.map((inq) => (
              <div 
                key={inq.id} 
                className={`bg-[#111111] border rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 ${inq.read ? 'border-white/5 opacity-70' : 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}
              >
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
                    onClick={() => handleDelete(inq.id)}
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
    </div>
  );
}
