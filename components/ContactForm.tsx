import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, AlertTriangle, CheckCircle, Database, HelpCircle, X, RefreshCw } from 'lucide-react';
import { ext_links } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [showGuide, setShowGuide] = useState(false);
  const [showCaptchaAlert, setShowCaptchaAlert] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setUserCaptcha('');
    setCaptchaError(false);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        ctx.fillStyle = '#050505'; // bg
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw noise lines
        for (let i = 0; i < 7; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvasRef.current.width, Math.random() * canvasRef.current.height);
          ctx.lineTo(Math.random() * canvasRef.current.width, Math.random() * canvasRef.current.height);
          ctx.strokeStyle = '#008F11';
          ctx.lineWidth = 1 + Math.random() * 2;
          ctx.stroke();
        }

        // Draw text
        ctx.font = 'bold 26px monospace';
        ctx.fillStyle = '#00ff41';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const x = canvasRef.current.width / 2;
        const y = canvasRef.current.height / 2;
        
        ctx.save();
        ctx.translate(x, y);
        // Add random rotation and skew for distortion
        const angle = (Math.random() - 0.5) * 0.3;
        ctx.rotate(angle);
        ctx.fillText(text, 0, 0);
        ctx.restore();

        // Draw noise dots
        for (let i = 0; i < 40; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvasRef.current.width, Math.random() * canvasRef.current.height, 1, 0, 2 * Math.PI);
          ctx.fillStyle = '#ffbf00';
          ctx.fill();
        }
      }
    }
  };

  // Script web app URL for Google Apps Script form submission
  const SCRIPT_URL = ext_links.form_script_url; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptcha.trim() !== captchaText) {
      setCaptchaError(true);
      setShowCaptchaAlert(true);
      generateCaptcha();
      return;
    }
    
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

        <div className="space-y-2 group">
          <label className={`text-xs transition-colors ${captchaError ? 'text-red-500' : 'text-retro-green/70 group-focus-within:text-retro-accent'}`}>
            &gt; HUMAN_VERIFICATION: 
          </label>
          <div className="flex gap-2 items-center">
            <canvas 
              ref={canvasRef} 
              width={160} 
              height={50} 
              className={`border ${captchaError ? 'border-red-500' : 'border-retro-green/50'} cursor-pointer`} 
              onClick={generateCaptcha} 
              title="Click to refresh captcha" 
            />
            <button 
              type="button" 
              onClick={generateCaptcha} 
              className="p-3 border border-retro-green/30 text-retro-green hover:bg-retro-green hover:text-black transition-colors" 
              title="Refresh Captcha"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <input 
            type="text" 
            name="captcha"
            required
            value={userCaptcha}
            onChange={(e) => {
              setUserCaptcha(e.target.value);
              setCaptchaError(false);
            }}
            className={`w-full bg-black border-b outline-none py-2 px-1 text-retro-green placeholder-retro-green/20 ${captchaError ? 'border-red-500' : 'border-retro-green/50 focus:border-retro-accent'}`}
            placeholder="Type the characters from the image above precisely..."
          />
          {captchaError && <p className="text-xs text-red-500 mt-1">ERROR: Verification failed. Sequence updated.</p>}
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

      {showCaptchaAlert && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm border border-red-500/50">
          <div className="border border-red-500 bg-[#0a0000] p-6 shadow-[0_0_20px_rgba(255,0,0,0.5)] max-w-sm w-full text-center">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-red-500 mb-2 tracking-widest uppercase">Access Denied</h3>
            <p className="text-red-400 text-sm mb-8 font-mono">
              [HUMAN_VERIFICATION_FAILED]<br /><br />
              Invalid sequence detected. Please provide the exact characters to prove you are not a bot.
            </p>
            <button 
              type="button"
              onClick={() => setShowCaptchaAlert(false)}
              className="px-6 py-2 w-full bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors uppercase font-bold text-sm tracking-wider shadow-[0_0_10px_rgba(255,0,0,0.3)]"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
