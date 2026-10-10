import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { 
    title: 'AI & LLM Integration',
    desc: 'Built AI-assisted content generation workflows using language models to produce structured content and SEO metadata.',
    tag: 'AI / LLMs',
    skills: ['Language models', 'Structured content', 'SEO metadata']
  },
  { 
    title: 'Workflow Automation',
    desc: 'Developed n8n workflows connecting Google Sheets, AI models, and content-processing nodes to automate repetitive tasks.',
    tag: 'N8N AUTOMATION',
    skills: ['n8n', 'Google Sheets', 'AI models', 'Content-processing nodes']
  },
  { 
    title: 'Python Development',
    desc: 'Used Python to explore AI/ML concepts and develop practical programming projects.',
    tag: 'PYTHON',
    skills: ['Python', 'AI/ML concepts', 'Practical programming']
  },
  { 
    title: 'Data Processing',
    desc: 'Worked with JSON and structured data transformations to organize and process information across automation workflows.',
    tag: 'STRUCTURED DATA',
    skills: ['JSON', 'Structured data', 'Data transformations']
  },
  { 
    title: 'Web Technologies',
    desc: 'Worked with HTML and Markdown to transform generated content into web-ready formats.',
    tag: 'WEB TECHNOLOGIES',
    skills: ['HTML', 'Markdown', 'Web-ready content']
  },
  {
    title: 'Machine Learning',
    desc: 'Developed academic AI/ML projects involving driver drowsiness detection and breast cancer prediction.',
    tag: 'AI / ML PROJECTS',
    skills: ['Driver drowsiness detection', 'Breast cancer prediction']
  },
  {
    title: 'API & Tool Integration',
    desc: 'Connected applications and workflow components to streamline data exchange and automated processes.',
    tag: 'INTEGRATIONS',
    skills: ['API integration', 'Application workflows', 'Data exchange']
  },
  {
    title: 'SEO Content Automation',
    desc: 'Built automated content-generation pipelines that prepare blog content, descriptions, and metadata for publishing.',
    tag: 'SEO AUTOMATION',
    skills: ['Blog content', 'Descriptions', 'Metadata', 'Publishing preparation']
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const scrollFrameRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769 || reducedMotion || scrollFrameRef.current !== null) return;
    const container = e.currentTarget;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const center = container.scrollLeft + container.offsetWidth / 2;
    
      let activeIdx = 0;
      let minDiff = Infinity;
    
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(cardCenter - center);
        if (diff < minDiff) {
          minDiff = diff;
          activeIdx = i;
        }
      });

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        }
      });

      bgRefs.current.forEach((bg, i) => {
        if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    
      textRefs.current.forEach((txt, i) => {
        if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([...cardsRef.current, ...bgRefs.current, ...textRefs.current], { clearProps: 'all' });
        return;
      }

      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className={`relative w-full ${reducedMotion ? 'min-h-[100svh] h-auto overflow-visible' : 'h-[100svh] md:h-screen overflow-hidden'} bg-[#0b0b0b] text-white flex items-center justify-center md:[perspective:1000px]`}
    >
      {/* Dynamic Netflix Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className={`absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-black via-[#140203] to-black ${reducedMotion ? (i === 0 ? 'opacity-100' : 'hidden') : 'opacity-0'}`}
        />
      ))}

      {/* Massive Background Typography (Netflix Red & White Outline) */}
      {!reducedMotion && <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)'}`,
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>}

      {/* Carousel Container */}
      <div 
        className={`relative w-full z-10 ${reducedMotion ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-stretch gap-4 px-6 md:px-12 py-16' : 'h-full flex md:items-center md:justify-center md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x'}`}
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className={`${reducedMotion ? 'relative w-full min-h-[400px]' : 'md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px]'} rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500`}
          >
            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ {String(i + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')} ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;