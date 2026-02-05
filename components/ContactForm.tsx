import React, { useState } from 'react';
import { Send, Terminal, AlertTriangle, CheckCircle, Database, HelpCircle, X } from 'lucide-react';
import { ext_links } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [showGuide, setShowGuide] = useState(false);

  // Script web app URL for Google Apps Script form submission
  const SCRIPT_URL = ext_links.form_script_url; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');

    if (!SCRIPT_URL) {
      // Simulation mode if no URL is set
      setTimeout(() => {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('timestamp', new Date().toISOString());

      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // Essential for Google Apps Script
      });

      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Transmission Error", error);
      setStatus('ERROR');
    }
  };

  return (
    <div className="relative border border-retro-green bg-retro-green/5 p-6 shadow-[0_0_10px_rgba(0,255,65,0.1)]">
      <div className="absolute top-0 left-0 bg-retro-green px-2 py-1 text-black font-bold text-xs flex items-center gap-2">
        <Terminal size={12} /> MSG_UPLINK_TERMINAL
      </div>
      
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-1 group">
          <label className="text-xs text-retro-green/70 group-focus-within:text-retro-accent transition-colors">
            &gt; INPUT_NAME
          </label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black border-b border-retro-green/50 focus:border-retro-accent outline-none py-2 px-1 text-retro-green placeholder-retro-green/20"
            placeholder="Identify yourself..."
          />
        </div>

        <div className="space-y-1 group">
          <label className="text-xs text-retro-green/70 group-focus-within:text-retro-accent transition-colors">
            &gt; INPUT_EMAIL_ADDRESS
          </label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border-b border-retro-green/50 focus:border-retro-accent outline-none py-2 px-1 text-retro-green placeholder-retro-green/20"
            placeholder="return_path@example.com"
          />
        </div>

        <div className="space-y-1 group">
          <label className="text-xs text-retro-green/70 group-focus-within:text-retro-accent transition-colors">
            &gt; DATA_PAYLOAD (MESSAGE)
          </label>
          <textarea 
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-black border border-retro-green/50 focus:border-retro-accent outline-none p-2 text-retro-green placeholder-retro-green/20 resize-none"
            placeholder="Type your transmission here..."
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-xs">
            {status === 'IDLE' && <span className="animate-pulse text-retro-green/50">READY_TO_TRANSMIT</span>}
            {status === 'SENDING' && <span className="text-retro-accent animate-pulse">TRANSMITTING_PACKETS...</span>}
            {status === 'SUCCESS' && <span className="text-retro-green font-bold flex items-center gap-1"><CheckCircle size={12}/> UPLOAD_COMPLETE</span>}
            {status === 'ERROR' && <span className="text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={12}/> UPLOAD_FAILED</span>}
          </div>

          <button 
            type="submit" 
            disabled={status === 'SENDING' || status === 'SUCCESS'}
            className={`
              flex items-center gap-2 px-6 py-2 border font-bold transition-all
              ${status === 'SUCCESS' 
                ? 'bg-retro-green text-black border-retro-green' 
                : 'bg-retro-green/10 text-retro-green border-retro-green hover:bg-retro-accent hover:text-black'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {status === 'SENDING' ? 'PROCESSING...' : status === 'SUCCESS' ? 'SENT' : 'INITIATE_SEND'}
            {!status.match(/SENDING|SUCCESS/) && <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
