import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceItems = [
  {
    role: 'AI & Workflow Automation',
    organization: 'Resident360 by Aptapace',
    period: 'Currently working',
    summary: 'Workflow automation and SEO content preparation for a resident and community management platform.',
    responsibilities: [
      'Developed and maintained n8n-based workflows for AI-assisted blog content generation and publishing preparation.',
      'Integrated Google Sheets, AI language models, and content-processing nodes to organize blog content and SEO metadata.',
      'Built content-processing workflows using JavaScript, JSON, Markdown, and HTML transformations.',
      'Generated structured outputs and troubleshot data mapping and content-formatting issues.'
    ],
    skills: ['n8n', 'Google Sheets', 'AI language models', 'JavaScript', 'JSON', 'Markdown', 'HTML']
  },
  {
    role: 'Data Engineer',
    organization: 'Local24 Pvt. Ltd.',
    period: '2024',
    responsibilities: [
      'Developed data processing workflows to organize and transform structured information.',
      'Worked with Python and data-handling techniques to support efficient data operations.',
      'Supported data quality, workflow optimization, and reliable information processing.'
    ]
  },
  {
    role: 'Data Analytics',
    organization: 'Fantasy Solution',
    responsibilities: [
      'Analyzed and organized data to identify patterns and generate meaningful insights.',
      'Used data processing and visualization techniques to support data-driven decision-making.',
      'Worked on data cleaning, interpretation, and reporting to improve information accuracy.'
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-20 md:py-32 px-6 md:px-12 overflow-x-clip"
    >
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold">CAREER FEATURE</span>
            <span className="text-white/40">|</span>
            <span>WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            AI & WORKFLOW <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700">AUTOMATION.</span>
          </h2>
        </div>

        <article
          ref={cardRef}
          className="relative p-7 md:p-10 rounded-2xl bg-gradient-to-br from-[#1f0a0c] via-[#121212] to-[#080808] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] overflow-hidden group hover:border-red-600/50 transition-colors duration-500"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          <div className="space-y-8 relative z-10">
            {experienceItems.map((experience, index) => (
              <section key={experience.organization} className={index > 0 ? 'border-t border-white/10 pt-8' : ''}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-500 mb-2">{experience.organization}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white">{experience.role}</h3>
                  </div>
                  {experience.period && (
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50 border border-white/10 bg-white/5 px-3 py-2 rounded">
                      {experience.period}
                    </span>
                  )}
                </div>

                {experience.summary && <p className="text-sm md:text-base text-white/65 leading-relaxed mb-5">{experience.summary}</p>}
                <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3"><span className="text-red-500 font-bold">&#8250;</span><span>{responsibility}</span></li>
                  ))}
                </ul>

                {experience.skills && (
                  <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-white/10">
                    {experience.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Experience;