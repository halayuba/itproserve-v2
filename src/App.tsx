import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import Values from "./components/Values";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="noise">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Values />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
