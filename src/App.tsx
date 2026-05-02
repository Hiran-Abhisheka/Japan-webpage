import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Wind, Heart, Infinity as InfinityIcon, Menu, X, Plus, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

const SectionHeader = ({ number, title, subtitle, jpSubtitle }: { number: string; title: string, subtitle?: string, jpSubtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ margin: "-50px", once: false }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-4 mb-16 relative"
  >
    <div className="flex items-center gap-4">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-[2px] bg-nippon-red" 
      />
      <span className="font-display font-black text-nippon-red text-[10px] uppercase tracking-[0.4em]">{number}</span>
    </div>
    <div className="flex flex-col md:flex-row md:items-baseline gap-4">
       <h2 className="text-4xl md:text-7xl font-serif font-light leading-none tracking-tight">
        {title.split(' ')[0]} <span className="italic font-normal">{title.split(' ')[1] || ""}</span>
      </h2>
      {jpSubtitle && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.4, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-brush text-2xl md:text-4xl text-nippon-red leading-none"
        >
          {jpSubtitle}
        </motion.span>
      )}
    </div>
    {subtitle && <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-nippon-ink/40 mt-2">{subtitle}</p>}
  </motion.div>
);

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const BackgroundElements = () => {
  const petals = useMemo(() => [...Array(15)].map(() => ({
    left: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 15,
    size: 2 + Math.random() * 6
  })), []);

  const circles = useMemo(() => [...Array(3)].map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 150 + Math.random() * 250,
    duration: 20 + Math.random() * 10,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.08, 0.03],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-nippon-red rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.06, 0.03],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-nippon-red rounded-full blur-[100px]"
      />

      {/* Floating Circles */}
      {circles.map((circle, i) => (
        <motion.div 
          key={`circle-${i}`}
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: circle.duration, repeat: Infinity, ease: "easeInOut", delay: circle.delay }}
          className="absolute border border-nippon-red/5 rounded-full"
          style={{ 
            top: `${circle.top}%`, 
            left: `${circle.left}%`, 
            width: circle.size, 
            height: circle.size 
          }}
        />
      ))}
      
      {/* Falling Petals (Sakura) */}
      {petals.map((petal, i) => (
        <motion.div
          key={`petal-${i}`}
          initial={{ 
            top: -50, 
            left: `${petal.left}%`,
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            top: "110%",
            left: `${petal.left + (Math.random() > 0.5 ? 10 : -10)}%`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: 720
          }}
          transition={{ 
            duration: petal.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: petal.delay
          }}
          className="absolute bg-nippon-red/10"
          style={{ 
            width: petal.size, 
            height: petal.size,
            borderRadius: "80% 0 55% 50% / 55% 0 80% 50%"
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const heritageRef = useRef(null);
  const masterpiecesRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: heritageScroll } = useScroll({
    target: heritageRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: masterpiecesScroll } = useScroll({
    target: masterpiecesRef,
    offset: ["start end", "end start"],
  });

  const sunProgress = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heritageY = useTransform(heritageScroll, [0, 1], ["-10%", "10%"]);
  const masterpieceY = useTransform(masterpiecesScroll, [0, 1], ["-10%", "10%"]);

  const { scrollYProgress: globalScroll } = useScroll();
  const rotateSun = useTransform(globalScroll, [0, 1], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-nippon-bg selection:bg-nippon-red selection:text-white overflow-x-hidden">
      <BackgroundElements />
      
      {/* Decorative Rotating Sun in background */}
      <motion.div 
        style={{ rotate: rotateSun }}
        className="fixed -top-32 -right-32 w-96 h-96 border-[0.5px] border-nippon-red/10 rounded-full z-0 pointer-events-none"
      />

      {/* Vertical Decorative Text */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-12 pointer-events-none">
        <div className="h-24 w-px bg-nippon-red/20" />
        <span className="[writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.8em] text-nippon-ink/30">NIPPON ESSENCE / 日本の真髄</span>
        <div className="h-24 w-px bg-nippon-red/20" />
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-12 pointer-events-none">
        <div className="h-24 w-px bg-nippon-red/20" />
        <span className="[writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.8em] text-nippon-ink/30">TRADITION & FUTURE / 伝統と未来</span>
        <div className="h-24 w-px bg-nippon-red/20" />
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-32 h-32 rounded-full bg-nippon-red relative overflow-hidden"
              >
                <motion.div 
                  animate={{ y: ["100%", "0%"] }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-0 bg-white/10"
                />
              </motion.div>
              <div className="absolute inset-0 border-[0.5px] border-nippon-red/20 rounded-full scale-125" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="font-display font-black text-sm tracking-[0.8em] uppercase text-nippon-red">NIPPON</span>
              <span className="font-brush text-3xl text-nippon-ink/20 leading-none">日本の精神</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-nippon-ink text-white flex items-center justify-center rounded-full shadow-2xl hover:bg-nippon-red transition-colors group"
          >
            <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 1. Vertical Branding Rail */}
      <aside className="hidden lg:flex w-24 border-r border-nippon-border flex-col justify-between py-12 items-center bg-white sticky top-0 h-screen z-50 pattern-seigaiha">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-3xl font-black tracking-tighter text-nippon-red bg-white p-2 hover:scale-110 transition-transform"
        >
          JP
        </button>
        <div className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.5em] text-[10px] font-bold opacity-30 bg-white/80 py-4">
          NIPPON ESSENCE • EST. 660 BCE
        </div>
        <div className="w-1.5 h-1.5 bg-nippon-red rounded-full animate-ping" />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Navigation */}
        <nav className="h-24 border-b border-nippon-border flex items-center justify-between px-8 md:px-16 bg-white sticky top-0 z-40">
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-nippon-red origin-left z-50"
            style={{ scaleX: heroScroll, width: "100%" }}
          />
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex md:hidden text-2xl font-black tracking-tighter text-nippon-red"
          >
            JP
          </button>
          
          <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.3em]">
                {['Heritage', 'Nature', 'Masterpieces', 'Future'].map((item, idx) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                className="hover:text-nippon-red transition-colors text-nippon-ink/40"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden sm:block text-[10px] font-bold border-2 border-nippon-ink px-6 py-3 uppercase tracking-widest hover:bg-nippon-ink hover:text-white transition-all cursor-pointer">
              Inquiry
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-nippon-ink"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* 3. Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-[90vh] flex flex-col lg:flex-row items-center p-8 md:p-16 gap-16 overflow-hidden pattern-asanoha">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2 }}
            className="absolute top-10 right-10 font-brush text-[20vw] leading-none select-none pointer-events-none"
          >
            和
          </motion.div>

          {/* Left: Big Typography */}
          <div className="w-full lg:w-1/2 flex flex-col z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-nippon-red text-[11px] font-black uppercase tracking-[0.6em] mb-8">
                The Essence of Silence
              </h2>
            </motion.div>
            
            <div className="overflow-hidden mb-12">
              <motion.h1 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-7xl md:text-[8vw] font-serif font-light leading-[0.9] tracking-tighter"
              >
                Timeless<br/><span className="italic font-normal">Heritage</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-md text-base md:text-lg leading-relaxed text-nippon-ink/60 mb-12"
            >
              Discover the profound beauty of simplicity through Japanese spatial design and the ancient concept of 'Ma'—the space between.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-6 group cursor-pointer"
            >
              <span className="h-[1px] w-16 bg-nippon-red group-hover:w-24 transition-all duration-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Explore Curated Collection</span>
            </motion.div>
          </div>

          {/* Right: Geometric Composition */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-full flex items-center justify-center">
            <motion.div 
              style={{ scale: sunProgress }}
              className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-nippon-red rounded-full opacity-5 blur-3xl" 
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5 }}
              className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-nippon-red/20 rounded-full flex items-center justify-center p-8"
            >
               <div className="w-full h-full bg-nippon-red rounded-full shadow-2xl" />
            </motion.div>
            
            {/* Overlaid Data Cards */}
            <motion.div 
               initial={{ x: 50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: false }}
               transition={{ delay: 1 }}
               className="absolute bottom-10 left-0 md:-left-12 bg-white p-8 shadow-2xl border-l-[6px] border-nippon-red w-72 z-20"
            >
              <span className="text-[10px] text-gray-400 block mb-2 uppercase font-black tracking-widest">Heritage Spot</span>
              <h3 className="text-xl font-serif mb-3 leading-tight font-bold">The Golden Pavilion</h3>
              <p className="text-[10px] text-nippon-ink/50 leading-tight uppercase tracking-widest leading-none font-brush text-lg">金閣寺</p>
            </motion.div>

            <motion.div 
               initial={{ y: -50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: false }}
               transition={{ delay: 1.2 }}
               className="absolute top-10 right-0 md:-right-12 bg-nippon-ink text-white p-8 w-56 z-20"
            >
              <div className="flex justify-between items-start mb-6 font-brush">
                 <div className="text-4xl italic leading-none">〇一</div>
                 <Plus size={16} className="text-nippon-red" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-light opacity-60">Kyoto / Zen Masterpieces</div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Intro */}
        <section className="py-32 px-8 md:px-16 max-w-6xl">
           <SectionHeader number="01" title="Spatial Harmony." jpSubtitle="空間的調和" subtitle="MA — THE SPACE BETWEEN" />
           <div className="grid md:grid-cols-2 gap-16">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-2xl font-serif text-nippon-ink/80 leading-snug italic"
              >
                "Japanese architecture is not about creating boundaries, but about defining relationships between light, shadow, and silence."
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col gap-8"
              >
                <p className="text-nippon-ink/60 leading-relaxed text-sm uppercase tracking-wider">
                  The concept of 'Ma' describes the structural space which allows for new meaning to arise. It is the silence between notes, the void that gives shape to the vessel.
                </p>
                <div className="relative group overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2574&auto=format&fit=crop" 
                    className="w-full aspect-video object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border border-white/20" />
                </div>
              </motion.div>
           </div>
        </section>

        {/* Features Grid */}
        <section id="heritage" ref={heritageRef} className="py-32 px-8 md:px-16 bg-nippon-ink text-white relative overflow-hidden">
           <motion.div 
             style={{ y: heritageY }}
             className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none scale-110" 
           />
           <div className="relative z-10">
             <SectionHeader number="02" title="Eternal Heritage." jpSubtitle="伝統の遺産" subtitle="KODAI — ANCIENT WISDOM" />
             <motion.div 
               variants={staggerContainer}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: false, margin: "-100px" }}
               className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-12 overflow-hidden"
             >
                {[
                  { icon: <Wind size={20} />, title: "Zen Roots", jp: "禅", desc: "Finding stillness in the center of the storm." },
                  { icon: <Heart size={20} />, title: "Omotenashi", jp: "おもてなし", desc: "The art of selfless hospitality beyond expectation." },
                  { icon: <InfinityIcon size={20} />, title: "Wabi-Sabi", jp: "侘寂", desc: "Embracing the beauty of imperfection and time." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInVariants}
                    whileHover={{ backgroundColor: "rgba(188, 0, 45, 0.05)" }}
                    className="p-16 border-r border-b border-white/10 last:border-r-0"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-nippon-red">{item.icon}</div>
                      <span className="font-brush text-2xl opacity-20">{item.jp}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-light mb-6 tracking-tight">{item.title}</h3>
                    <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
             </motion.div>
           </div>
        </section>

        {/* Nature Highlight */}
        <section id="nature" className="py-32 px-8 md:px-16 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
               <div className="md:w-1/2">
                  <SectionHeader number="03" title="Seasonal Nature." jpSubtitle="季節の移ろい" subtitle="SHIZEN — THE SIXTH SENSE" />
               </div>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="md:w-1/3 text-[10px] uppercase tracking-[0.3em] font-bold text-nippon-ink/40 mb-16"
               >
                  The changing seasons define the rhythm of Japanese life, from the transient sakura to the fiery maples.
               </motion.p>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {[
                  { img: "https://images.unsplash.com/photo-1478144592103-2582188fe48c?q=80&w=2670&auto=format&fit=crop", label: "01 / SILENT GATE", jp: "鳥居" },
                  { img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2676&auto=format&fit=crop", label: "02 / TRANSIENCE", jp: "桜" },
                  { img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop", label: "03 / KYOTO LANES", jp: "京都" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInVariants}
                    whileHover={{ y: -10 }} 
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                      <motion.img 
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1.1 }}
                        transition={{ duration: 1.5 }}
                        src={item.img} alt="Nature" className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-1000" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 font-brush text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.jp}
                      </div>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30 group-hover:opacity-100 group-hover:text-nippon-red transition-all">{item.label}</span>
                  </motion.div>
                ))}
            </motion.div>
        </section>

        {/* Masterpieces Section */}
        <section id="masterpieces" ref={masterpiecesRef} className="py-32 px-8 md:px-16 bg-white border-y border-nippon-border relative overflow-hidden">
           <motion.div 
             style={{ y: masterpieceY }}
             className="absolute inset-0 pattern-asanoha opacity-10 pointer-events-none scale-110" 
           />
           <div className="relative z-10">
             <SectionHeader number="04" title="Artistic Masterpieces." jpSubtitle="芸術の傑作" subtitle="UKIYO-E — FLOATING WORLD" />
             <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                   <div className="absolute inset-0 border border-nippon-red/20 -m-4 z-0" />
                   <img 
                      src="https://images.unsplash.com/photo-1569429593410-b498b3f3246a?q=80&w=2574&auto=format&fit=crop" 
                      alt="Ukiyo-e inspiration" 
                      className="relative z-10 w-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                   />
                </motion.div>
                <div className="flex flex-col gap-8">
                   <motion.h3 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: false }}
                     transition={{ delay: 0.2 }}
                     className="text-3xl font-serif leading-tight"
                   >
                     The Dialogue of <span className="font-brush text-nippon-red">Lines & Color</span>
                   </motion.h3>
                   <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: false }}
                     transition={{ delay: 0.4 }}
                     className="text-nippon-ink/60 leading-relaxed text-sm"
                   >
                      Traditional Japanese art emphasizes clarity of line and flatness of color—principles that eventually birthed modern graphic design and comics. 
                   </motion.p>
                   <motion.ul 
                     variants={staggerContainer}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: false }}
                     className="grid grid-cols-2 gap-4"
                   >
                      {['Katsushika Hokusai', 'Utagawa Hiroshige', 'Kitagawa Utamaro', 'Toshusai Sharaku'].map((artist) => (
                        <motion.li 
                          key={artist} 
                          variants={fadeInVariants}
                          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-nippon-ink/40"
                        >
                          <div className="w-1.5 h-1.5 bg-nippon-red rounded-full" /> {artist}
                        </motion.li>
                      ))}
                   </motion.ul>
                </div>
             </div>
           </div>
        </section>


        {/* Footer Stats Grid */}
        <footer className="mt-auto border-t border-nippon-border grid md:grid-cols-4 bg-white">
          {[
            { label: "Founded", value: "660 BCE / ", jp: "紀元前" },
            { label: "Prefectures", value: "47 Total / ", jp: "都道府県" },
            { label: "Capital", value: "Tokyo / ", jp: "東京" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
              className="border-r border-nippon-border flex flex-col justify-center p-12 lg:p-16"
            >
              <span className="text-[10px] uppercase tracking-widest text-nippon-ink/30 mb-2 font-bold">{stat.label}</span>
              <span className="font-serif text-3xl font-light">{stat.value}<span className="font-brush text-lg">{stat.jp}</span></span>
            </motion.div>
          ))}
          <motion.div 
             whileHover={{ backgroundColor: "#8B001D" }}
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: false }}
             className="flex items-center justify-center bg-nippon-red text-white cursor-pointer transition-colors p-16 group relative overflow-hidden"
          >
             <div className="absolute inset-0 pattern-seigaiha opacity-10 group-hover:scale-110 transition-transform duration-500" />
             <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-4">
                Start Journey <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </span>
          </motion.div>
        </footer>

        {/* Deep Footer */}
        <div className="p-8 md:p-16 bg-nippon-bg flex flex-col md:flex-row justify-between items-center gap-8 border-t border-nippon-border">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 bg-nippon-red rounded-full" />
             <span className="text-[9px] font-black uppercase tracking-[0.6em] opacity-40 leading-none">© 2026 NIPPON ESSENCE • TRADITION & FUTURE</span>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest opacity-40">
             <a href="#" className="hover:text-nippon-red transition-colors">Digital Archive</a>
             <a href="#" className="hover:text-nippon-red transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-nippon-red transition-colors">Terms of Service</a>
          </div>
        </div>
      </main>
    </div>
  );
}
