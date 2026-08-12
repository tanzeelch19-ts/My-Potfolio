import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import GithubStats from "./components/GithubStats.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollTop from "./components/ScrollTop.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.title = "Ch Tanzeel — Frontend / React Developer";
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen bg-paper dark:bg-ink-900 text-ink-900 dark:text-paper transition-colors overflow-x-hidden">
        {/* floating gradient blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            className="bg-blob"
            style={{
              top: "-10%",
              left: "-5%",
              width: "420px",
              height: "420px",
              background:
                "radial-gradient(circle, #E8A33D 0%, transparent 70%)",
            }}
          />
          <div
            className="bg-blob"
            style={{
              top: "30%",
              right: "-8%",
              width: "380px",
              height: "380px",
              background:
                "radial-gradient(circle, #FFC978 0%, transparent 70%)",
              animationDelay: "3s",
            }}
          />
          <div
            className="bg-blob"
            style={{
              bottom: "-10%",
              left: "20%",
              width: "460px",
              height: "460px",
              background:
                "radial-gradient(circle, #B9770E 0%, transparent 70%)",
              animationDelay: "6s",
            }}
          />
        </div>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <GithubStats />
        <Contact />
        <Footer />
        <ScrollTop />
      </div>
    </div>
  );
}