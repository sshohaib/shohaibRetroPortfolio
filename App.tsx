import React from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import CRTOverlay from './components/CRTOverlay';
import FintechViz from './components/FintechViz';
import PhotoCarousel from './components/PhotoCarousel';
import ContactForm from './components/ContactForm';
import { PERSONAL_INFO, EXPERIENCE, SKILLS, CERTIFICATIONS, EDUCATION } from './constants';
import { Mail, Phone, MapPin, Linkedin, Github, Database, Cpu, ShieldCheck, MessageSquareMore } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Typewriter } from "react-simple-typewriter";


const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen font-mono text-retro-green selection:bg-retro-green selection:text-retro-bg relative">
        <CRTOverlay />
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 pb-24 relative z-10">
          
          {/* HERO SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-block border border-retro-green px-2 py-1 text-xs text-retro-green animate-pulse">
                STATUS: ONLINE
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-retro-accent uppercase glitch-text">
                <Typewriter words={[PERSONAL_INFO.name]} loop={false} cursorStyle="_"  cursorBlinking={true} cursor={true} />
              </h1>
              <h2 className="text-xl md:text-2xl text-retro-green/80 border-l-4 border-retro-green pl-4">
                {PERSONAL_INFO.title}
              </h2>
              <p className="text-retro-green/70 leading-relaxed max-w-xl">
                {PERSONAL_INFO.summary}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 bg-retro-green text-retro-bg px-4 py-2 font-bold hover:bg-retro-accent transition-colors">
                  <Mail size={18} /> CONTACT_ME
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-retro-green px-4 py-2 hover:bg-retro-green/20 transition-colors">
                  <Linkedin size={18} /> LINKEDIN
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-retro-green px-4 py-2 hover:bg-retro-green/20 transition-colors">
                  <Github size={18} /> GITHUB
                </a>
                <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-retro-green px-4 py-2 hover:bg-retro-green/20 transition-colors">
                  <MessageSquareMore size={18} /> Whatsapp
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-2 border border-retro-green/30 rotate-2"></div>
              <div className="absolute -inset-2 border border-retro-accent/30 -rotate-2"></div>
              <PhotoCarousel />
              <div className="mt-4">
                <FintechViz />
              </div>
            </div>
          </section>

          {/* EXPERIENCE LOG */}
          <section id="experience" className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Database className="w-8 h-8 text-retro-accent" />
              <h2 className="text-3xl font-bold uppercase decoration-retro-accent underline decoration-4 underline-offset-8">
                Execution_Logs
              </h2>
            </div>
            
            <div className="relative border-l-2 border-retro-green/30 ml-3 md:ml-6 space-y-12">
              {EXPERIENCE.map((job) => (
                <div key={job.id} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-retro-bg border-2 border-retro-green rounded-full"></div>
                  
                  <div className="bg-retro-green/5 border border-retro-green/20 p-6 hover:border-retro-green hover:bg-retro-green/10 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-retro-green group-hover:text-retro-accent transition-colors">
                          {job.role}
                        </h3>
                        <h4 className="text-lg text-retro-green/80">{job.company}</h4>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <span className="block text-retro-accent font-bold bg-retro-accent/10 px-2 py-1 text-sm">
                          {job.period}
                        </span>
                        <span className="text-xs text-retro-green/60 mt-1 block">{job.location}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {job.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-retro-green/90">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-retro-green shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS & DATA */}
          <section id="skills" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Cpu className="w-8 h-8 text-retro-accent" />
                <h2 className="text-3xl font-bold uppercase decoration-retro-accent underline decoration-4 underline-offset-8">
                  Skill_Matrix
                </h2>
              </div>
              
              <div className="h-80 w-full border border-retro-green/30 bg-retro-bg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILLS} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100} 
                      tick={{ fill: '#00ff41', fontSize: 12, fontFamily: 'Share Tech Mono' }} 
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(0, 255, 65, 0.1)'}}
                      contentStyle={{ backgroundColor: '#050505', borderColor: '#00ff41' }}
                    />
                    <Bar dataKey="level" barSize={15}>
                      {SKILLS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.category === 'Data' ? '#ffbf00' : '#00ff41'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-retro-accent"></span> DATA_CORE</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-retro-green"></span> DEV_NET_OPS</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <ShieldCheck className="w-8 h-8 text-retro-accent" />
                <h2 className="text-3xl font-bold uppercase decoration-retro-accent underline decoration-4 underline-offset-8">
                  Cert_Auth
                </h2>
              </div>
              
              <div className="grid gap-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="border border-retro-green p-4 flex justify-between items-center hover:bg-retro-green/10 transition-colors">
                    <div>
                      <h3 className="font-bold text-retro-accent">{cert.name}</h3>
                      <p className="text-sm text-retro-green/70">{cert.issuer}</p>
                    </div>
                    <span className="text-xs border border-retro-green px-2 py-1">{cert.date}</span>
                  </div>
                ))}

                <div className="mt-6 border-t border-dashed border-retro-green/50 pt-6">
                   <h3 className="text-xl font-bold mb-4">EDUCATION_HISTORY</h3>
                   {EDUCATION.map((edu, idx) => (
                     <div key={idx}>
                       <h4 className="font-bold text-lg">{edu.school}</h4>
                       <p className="text-retro-accent">{edu.degree}</p>
                       <p className="text-sm text-retro-green/60">{edu.period} | {edu.location}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </section>


          {/* CONTACT & TRANSMISSION */}
          <section id="contact" className="border-t-4 border-retro-green pt-12 pb-6">
            <h2 className="text-3xl font-bold mb-12 blink text-center">INITIATE_HANDSHAKE</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="border border-retro-green p-6 bg-retro-green/5">
                  <h3 className="text-xl font-bold text-retro-accent mb-6">COMM_CHANNELS</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="bg-retro-green/10 p-3 rounded-sm border border-retro-green/30">
                         <Phone size={24} className="text-retro-accent" />
                       </div>
                       <div>
                         <label className="text-xs text-retro-green/50 block">SECURE_LINE</label>
                         <span className="text-lg hover:text-retro-accent hover:text-xl transition-shadow">{PERSONAL_INFO.phone}</span>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="bg-retro-green/10 p-3 rounded-sm border border-retro-green/30">
                         <Mail size={24} className="text-retro-accent" />
                       </div>
                       <div>
                         <label className="text-xs text-retro-green/50 block">DIGITAL_MAIL</label>
                         <span className="text-lg hover:text-retro-accent hover:text-xl transition-opacity break-all">{PERSONAL_INFO.email}</span>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="bg-retro-green/10 p-3 rounded-sm border border-retro-green/30">
                         <MapPin size={24} className="text-retro-accent" />
                       </div>
                       <div>
                         <label className="text-xs text-retro-green/50 block">PHYSICAL_COORDINATES</label>
                         <span className="text-lg hover:text-retro-accent hover:text-xl transition-transform">{PERSONAL_INFO.location}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <p className="text-xs text-retro-green/40">
                    DATA_ANALYST_@_WSD.. | ENGR_MD_SHOHAIB_ISLAM | © 2026
                  </p>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </section>

        
          {/* CONTACT FOOTER */}
          {/*<footer id="contact" className="border-t-4 border-retro-green pt-12 pb-6 text-center">
            <h2 className="text-3xl font-bold mb-8 blink">INITIATE_HANDSHAKE</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
              <div className="flex items-center justify-center gap-2">
                 <Phone size={25} className="text-retro-accent" />
                 <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                 <MapPin size={25} className="text-retro-accent" />
                 <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                 <Mail size={25} className="text-retro-accent" />
                 <span>{PERSONAL_INFO.email}</span>
              </div>
            </div>
            <p className="text-xs text-retro-green/40">
              DATA_ANALYST_@_WSD.. | ENGR_MD_SHOHAIB_ISLAM | © 2026
            </p>
          </footer>*/}

        </main>
      </div>
    </HashRouter>
  );
};

export default App;