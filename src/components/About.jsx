import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technicalFocus = [
  {
    category: 'Programming',
    skills: ['Python', 'JavaScript fundamentals']
  },
  {
    category: 'Artificial Intelligence',
    skills: ['AI/ML fundamentals', 'LLM integration', 'OpenAI API and language model workflows', 'AI-assisted content generation']
  },
  {
    category: 'Workflow Automation',
    skills: ['n8n', 'Workflow design', 'Process automation', 'Google Sheets integration', 'Automated content generation', 'SEO metadata processing']
  },
  {
    category: 'Data Handling',
    skills: ['JSON', 'Markdown', 'Data transformation', 'Structured data processing']
  },
  {
    category: 'Web Technologies',
    skills: ['HTML', 'CSS', 'API integration']
  },
  {
    category: 'Data Science',
    skills: ['Data analysis fundamentals', 'Pandas', 'NumPy', 'scikit-learn']
  },
  {
    category: 'Development Practices',
    skills: ['Debugging', 'Problem-solving', 'Visual Studio Code', 'Git', 'GitHub']
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [selectedFocus, setSelectedFocus] = useState(technicalFocus[0]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (!section || !cards.length) return;

    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, section);

    const removeListeners = [];
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cards.forEach((card) => {
        if (!card) return;
        const listener = (e) => handleMouseMove(e, card);
        card.addEventListener('mousemove', listener);
        removeListeners.push(() => card.removeEventListener('mousemove', listener));
      });
    }

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
      context.revert();
    };

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[#050505] text-white py-20 md:py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE ENGINEER</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            EPISODE SYNOPSIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              ORIGIN & VISION.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>
            
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">Cast & Background</h3>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I&apos;m <span className="text-white font-bold drop-shadow">Harshavardhan Babu Dasari</span>, an aspiring AI Engineer and Python Developer with a B.Tech background in Artificial Intelligence and Data Science.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                My journey is driven by a passion for technology, continuous learning, and building practical solutions using AI, Python, and workflow automation.
              </p>
            </div>
            
            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">AI / ML</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Data Science</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">n8n Automation</span>
            </div>
          </div>

          {/* Card 2: Fellowships & Achievements (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>
            
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">Academic Profile</h3>
              <div className="space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-white">Bachelor of Technology (B.Tech)</h4>
                <p className="text-sm text-red-300 font-medium">Artificial Intelligence &amp; Data Science</p>
              </div>
              <ul className="space-y-3.5 text-sm text-white/80 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">&#8250;</span>
                  <span><strong className="text-white">Degree:</strong> Bachelor of Technology</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">&#8250;</span>
                  <span><strong className="text-white">Specialization:</strong> Artificial Intelligence and Data Science</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">&#8250;</span>
                  <span><strong className="text-white">Academic Focus:</strong> Artificial Intelligence, Machine Learning, Python Programming, Data Science, and Software Development.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col gap-7 hover:border-red-600/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">Technical Focus</h3>
              <p className="text-base md:text-lg font-semibold text-white">Select a category to explore the skills and tools.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10" role="group" aria-label="Technical focus categories">
              {technicalFocus.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => setSelectedFocus(item)}
                  aria-pressed={selectedFocus.category === item.category}
                  className={`px-4 py-2 rounded border text-xs md:text-sm font-mono tracking-wide transition-all ${selectedFocus.category === item.category ? 'bg-red-600/20 border-red-600/60 text-white' : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-red-600/10 hover:border-red-600/40 hover:text-white'}`}
                >
                  {item.category}
                </button>
              ))}
            </div>

            <div className="relative z-10 border-t border-white/10 pt-5" aria-live="polite">
              <h4 className="text-sm font-mono uppercase tracking-widest text-red-400 mb-4">{selectedFocus.category}</h4>
              <div className="flex flex-wrap gap-2.5">
                {selectedFocus.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wide text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;