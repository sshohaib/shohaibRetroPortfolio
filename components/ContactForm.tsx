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

  // ---------------------------------------------------------------------------
  // CONFIGURATION:
  // 1. Create a Google Sheet
  // 2. Extensions > Apps Script
  // 3. Paste the code from the '?' guide button
  // 4. Deploy > New Deployment > Web App > Access: "Anyone"
  // 5. Paste the URL below:
  // ---------------------------------------------------------------------------
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
      
      {/*<div className="absolute top-2 right-2">
        <button 
          onClick={() => setShowGuide(!showGuide)}
          className="text-xs flex items-center gap-1 text-retro-accent hover:underline"
        >
          <Database size={12} /> {showGuide ? 'CLOSE_GUIDE' : 'CONNECT_TO_EXCEL'}
        </button>
      </div>*/}

      {/*{showGuide && (
        <div className="mb-6 mt-4 p-4 border border-retro-accent/50 bg-retro-accent/5 text-xs text-retro-green font-mono overflow-hidden relative">
          <h4 className="font-bold text-retro-accent mb-2">Google Sheet Backend Setup:</h4>
          <ol className="list-decimal pl-4 space-y-1 mb-2 text-retro-green/80">
            <li>Create a Google Sheet. Headers (Row 1): <code className="text-white">timestamp</code>, <code className="text-white">name</code>, <code className="text-white">email</code>, <code className="text-white">message</code>.</li>
            <li>Go to <strong>Extensions -- Apps Script</strong>.</li>
            <li>Paste the code below into Code.gs.</li>
            <li>Run <code>initialSetup()</code> once.</li>
            <li><strong>Deploy -- New Deployment</strong> -- Select "Web App".</li>
            <li>Execute as: "Me", Who has access: <strong>"Anyone"</strong> (Important!).</li>
            <li>Copy the URL and paste it into <code>const SCRIPT_URL</code> in <code>ContactForm.tsx</code>.</li>
          </ol>
          <div className="bg-black p-2 border border-retro-green/30 overflow-x-auto h-32">
            <pre className="whitespace-pre">
{`const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1
    const newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow })).setMimeType(ContentService.MimeType.JSON)
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e })).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}`}
            </pre>
          </div>
        </div>
      )}*/}
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
