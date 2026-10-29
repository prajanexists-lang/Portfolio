import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Competitive from "./components/Competitive.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-50 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Competitive />
      </main>
      <Footer />
    </div>
  );
}

