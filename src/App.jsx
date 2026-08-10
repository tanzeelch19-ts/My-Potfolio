import { useState } from 'react';
import './styles/overHaul.css';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null);

  const handleSelectSkill = (skill) => {
    setActiveSkill((current) => (current === skill ? null : skill));
  };

  return (
    <div className="bg-bg text-ink font-body antialiased">
      <Nav />
      <ScrollProgress />
      <Hero />
      <About />
      <Skills activeSkill={activeSkill} onSelectSkill={handleSelectSkill} />
      <Timeline />
      <Projects activeSkill={activeSkill} />
      <Contact />
      <Footer />
    </div>
  );
}