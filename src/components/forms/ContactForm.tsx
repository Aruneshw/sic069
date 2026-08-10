'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ToastCard from '@/components/ui/ToastCard';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      toast.custom((t) => (
        <ToastCard 
          t={t} 
          title="Message Sent!" 
          message="We have successfully received your message and will get back to you shortly." 
          type="success" 
        />
      ));
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.custom((t) => (
        <ToastCard 
          t={t} 
          title="Delivery Failed" 
          message="There was an issue sending your message. Please try again." 
          type="error" 
        />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <input 
            type="text" 
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <input 
            type="email" 
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
          <select 
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="" className="text-navy-900">Select a topic...</option>
            <option value="Booking Enquiry" className="text-navy-900">Booking Enquiry</option>
            <option value="Custom Group Tour" className="text-navy-900">Custom Group Tour</option>
            <option value="General Support" className="text-navy-900">General Support</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea 
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
            placeholder="How can we help you plan your next trip?"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-cta w-full py-4 text-base mt-2 shadow-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
