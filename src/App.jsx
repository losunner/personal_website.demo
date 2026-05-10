import { useState, useEffect, useRef } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { data } from "./data";
import { ProcessCard } from "./components/ui/ProcessCard";
import { ScrollRevealText } from "./components/ui/ScrollRevealText";
import { ArrowRight, Download, Globe, Mail, Phone, MapPin } from "lucide-react";

function App() {
  const [lang, setLang] = useState("en");
  const content = data[lang];
  const aboutRef = useRef(null);
  
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start 85%", "end 35%"]
  });

  // Simple typing effect for role
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % content.hero.role.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.hero.role.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#EBE5DE] text-[#1A1A1A] selection:bg-black selection:text-[#EBE5DE]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled ? "bg-[#EBE5DE]/80 backdrop-blur-md shadow-sm" : "bg-transparent mix-blend-difference text-white"}`}>
        <div className="font-bold tracking-widest text-sm uppercase transition-transform hover:scale-110">LJ.</div>
        <button 
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-all duration-300 hover:scale-110 uppercase tracking-wider"
        >
          <Globe size={16} />
          {lang === "en" ? "EN / 中文" : "中文 / EN"}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 opacity-60">
          {content.hero.tagline}
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-8">
          {content.hero.name}
        </h1>
        <div className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight h-16 text-black/60">
          {content.hero.role[roleIndex]}
        </div>
        
        <div className="mt-20 flex flex-wrap gap-6">
          <a href="#contact" className="group flex items-center gap-3 bg-[#1A1A1A] text-[#EBE5DE] px-8 py-4 rounded-full font-medium tracking-wide hover:bg-black transition-all duration-300 hover:scale-110">
            {content.hero.cta2}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <button className="flex items-center gap-3 border border-[#1A1A1A]/20 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#1A1A1A]/5 transition-all duration-300 hover:scale-110">
            {content.hero.cta1}
            <Download size={20} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-12 bg-[#E1DCD3]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">/ {content.about.title}</h2>
          </div>
          <div className="lg:w-2/3">
            <div ref={aboutRef} className="flex flex-col gap-6 mb-20 text-justify">
              {content.about.description.map((sentence, idx) => (
                <ScrollRevealText 
                  key={idx}
                  text={sentence}
                  index={idx}
                  total={content.about.description.length}
                  scrollYProgress={aboutScrollProgress}
                  className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-justify"
                />
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-12">
              {content.about.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-sm font-medium opacity-60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience (Process Cards Sticky Stack) */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold">/ {content.experience.title}</h2>
        </div>
        
        <div className="max-w-6xl mx-auto relative pb-32">
          {content.experience.items.map((item, index) => (
            <ProcessCard 
              key={index} 
              data={item} 
              index={index} 
              total={content.experience.items.length} 
            />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 md:px-12 bg-[#EBE5DE]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">/ {content.portfolio.title}</h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter">Selected Works</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            {content.portfolio.items.map((project, index) => (
              <motion.div 
                key={index} 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {project.image && (
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    {/* Halftone grid overlay */}
                    <div className="absolute inset-0 z-20 halftone-grid pointer-events-none"></div>

                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto block portfolio-image relative z-10 rounded-2xl"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div className="absolute top-6 left-6 z-30">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest font-bold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                )}
                {!project.image && (
                   <div className="mb-6 relative overflow-hidden rounded-2xl bg-black/5 p-12 flex items-center justify-center min-h-[300px]">
                     <span className="px-3 py-1 bg-black/5 text-[10px] uppercase tracking-widest font-bold rounded-full relative z-10">
                       {project.category}
                     </span>
                   </div>
                )}
                <div className="flex justify-between items-start transition-all duration-300 group-hover:translate-x-2">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      {project.title}
                    </h4>
                    <p className="text-sm opacity-60 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-sm font-mono opacity-40">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <section id="skills" className="py-32 px-6 md:px-12 bg-[#E1DCD3]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
          {/* Education */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-16">/ {content.education.title}</h2>
            <div className="flex flex-col gap-12">
              {content.education.items.map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-8">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-2xl font-bold">{item.school}</h3>
                    <span className="text-sm font-medium opacity-60 font-mono">{item.time}</span>
                  </div>
                  <div className="text-lg font-medium mb-4">{item.degree}</div>
                  <p className="opacity-70 text-sm leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-16">/ {content.skills.title}</h2>
            <div className="flex flex-col gap-12">
              {content.skills.groups.map((group, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold mb-6">{group.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((skill, j) => (
                      <span key={j} className="px-4 py-2 rounded-full border border-black/20 text-sm font-medium hover:bg-black hover:text-[#EBE5DE] transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#1A1A1A] text-[#EBE5DE]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 justify-between">
          <div className="md:w-1/2">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">{content.contact.title}</h2>
            <p className="text-xl opacity-60 font-light max-w-md">
              Available for new opportunities. Let's build something great together.
            </p>
          </div>
          
          <div className="flex flex-col gap-8 md:w-1/3">
            <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 text-xl opacity-60 hover:opacity-100 transition-opacity">
              <Mail /> {content.contact.email}
            </a>
            <a href={`tel:${content.contact.phone}`} className="flex items-center gap-4 text-xl opacity-60 hover:opacity-100 transition-opacity">
              <Phone /> {content.contact.phone}
            </a>
            <div className="flex items-center gap-4 text-xl opacity-60">
              <MapPin /> {content.contact.address}
            </div>
            <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-xl text-white hover:opacity-70 transition-opacity">
              LinkedIn Profile
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex justify-between items-center text-sm opacity-50 uppercase tracking-widest font-medium">
          <p>© 2026 {content.hero.name}</p>
          <a href="#" className="hover:opacity-100 transition-opacity">Back to Top</a>
        </div>
      </section>
    </div>
  );
}

export default App;
