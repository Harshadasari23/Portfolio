import { useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProfileChooser from './components/ProfileChooser';

const defaultSections = [
  <Hero key="hero" />,
  <About key="about" />,
  <Expertise key="expertise" />,
  <Skills key="skills" />,
  <Projects key="projects" />,
  <Experience key="experience" />,
  <Contact key="contact" />,
  <Footer key="footer" />
];

const profileSections = {
  harsha: defaultSections,
  developer: [
    <Hero key="hero" />,
    <Skills key="skills" />,
    <Projects key="projects" />,
    <Contact key="contact" />,
    <About key="about" />,
    <Expertise key="expertise" />,
    <Experience key="experience" />,
    <Footer key="footer" />
  ],
  recruiter: [
    <Contact key="contact" />,
    <Skills key="skills" />,
    <Projects key="projects" />,
    <Experience key="experience" />,
    <Hero key="hero" />,
    <About key="about" />,
    <Expertise key="expertise" />,
    <Footer key="footer" />
  ],
  other: [<Contact key="contact" />]
};

function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative cursor-none selection:bg-red-600 selection:text-white">
      {loading ? (
        <NetflixPreloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          {profile === null ? <ProfileChooser onSelect={setProfile} /> : profileSections[profile]}
        </>
      )}
    </main>
  );
}

export default App;