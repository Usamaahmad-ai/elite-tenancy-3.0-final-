import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// A reusable counter component for the stats section
function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(updateCount);
  }, [end, duration, inView]);

  return (
    <div ref={nodeRef} className="font-serif text-5xl md:text-7xl text-primary mb-2">
      {count}{suffix}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Placeholder for ambient video, using gradient mesh for now */}
        <motion.div 
          style={{ y, opacity }} 
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background"
        >
          {/* subtle animated noise/texture could go here */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              Your room filled in 14 days. <br/>
              <span className="text-white/60">Guaranteed across the UK.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            className="w-full max-w-2xl mx-auto h-[1px] bg-primary relative my-8 origin-center"
          >
            <div className="absolute inset-0 bg-primary blur-[4px] opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-12">
              Find your room anywhere in Britain. <br/>
              <span className="text-primary text-glow">Pay nothing. Ever.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact?type=landlord">
                <Button variant="gold" size="lg" className="w-full sm:w-auto min-w-[200px]">I have a room to fill</Button>
              </Link>
              <span className="text-white/30 text-sm font-serif italic">or</span>
              <Link href="/contact?type=tenant">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-white/20 text-white hover:bg-white/5">I need a room</Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* SPLIT SCROLL NARRATIVE */}
      <section className="relative bg-background pt-24 pb-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          {/* Landlord Side */}
          <div className="relative p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
            <div className="absolute inset-0 z-0">
              {/* using generated image */}
              <img src={`${import.meta.env.BASE_URL}images/hero-landlord.png`} alt="Empty premium room" className="w-full h-full object-cover opacity-20 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            </div>
            <div className="relative z-10 max-w-md ml-auto">
              <h3 className="text-primary tracking-widest uppercase text-sm mb-6">For Landlords</h3>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-white mb-6">
                  Section 21 is gone. <br/>
                  <span className="text-white/50">One wrong tenant now costs you a year of your life.</span>
                </h2>
                <p className="text-white/60 mb-8 text-lg leading-relaxed">
                  The rules changed. The risk multiplied. We built a 6-point verification system to protect your asset in the new era of renting.
                </p>
                <Link href="/landlords" className="group flex items-center text-primary hover:text-white transition-colors">
                  <span className="mr-4 uppercase tracking-wider text-sm">See how we protect you</span>
                  <div className="w-12 h-[1px] bg-primary group-hover:w-16 group-hover:bg-white transition-all duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Tenant Side */}
          <div className="relative p-12 md:p-24 flex flex-col justify-center bg-[#0d0d0d]">
             <div className="absolute inset-0 z-0">
              <img src={`${import.meta.env.BASE_URL}images/hero-tenant.png`} alt="Tenant arriving" className="w-full h-full object-cover opacity-15 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]" />
            </div>
            <div className="relative z-10 max-w-md mr-auto">
              <h3 className="text-primary tracking-widest uppercase text-sm mb-6">For Tenants</h3>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-white mb-6">
                  You've paid fees to be ignored. <br/>
                  <span className="text-white/50">That ends here.</span>
                </h2>
                <p className="text-white/60 mb-8 text-lg leading-relaxed">
                  We don't charge you to find a home. We build your profile once, verify it, and match you with premium properties nationwide. For free. Always.
                </p>
                <Link href="/tenants" className="group flex items-center text-primary hover:text-white transition-colors">
                  <span className="mr-4 uppercase tracking-wider text-sm">Create your free profile</span>
                  <div className="w-12 h-[1px] bg-primary group-hover:w-16 group-hover:bg-white transition-all duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="brand-line absolute bottom-0 left-0" />
      </section>

      {/* THE STATS */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { num: 4, suffix: "M+", label: "Landlords navigating the Renters Rights Act" },
              { num: 12, suffix: "M", label: "Private renters in the UK" },
              { num: 14, suffix: "", label: "Days average time to fill a room" },
              { num: 0, suffix: "", prefix: "£", label: "Tenant fees. Always." },
              { num: 6, suffix: "", label: "Documents verified per tenant" }
            ].map((stat, i) => (
              <div key={i} className="pt-8 md:pt-0 md:px-6 flex flex-col items-center text-center">
                <div className="flex items-start">
                  {stat.prefix && <span className="text-3xl text-primary mt-2 mr-1">{stat.prefix}</span>}
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} duration={2 + i * 0.2} />
                </div>
                <p className="text-white/50 text-sm mt-4 uppercase tracking-widest leading-relaxed max-w-[180px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HUMAN STORIES */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Real outcomes. <span className="text-white/50">Zero friction.</span></h2>
            <div className="w-24 h-px bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "portrait-nurse.png", name: "Sarah, NHS Nurse", quote: "Working nights, I couldn't do endless viewings. They built my profile, found the flat, and I didn't pay a penny.", type: "Tenant" },
              { img: "portrait-landlord.png", name: "David, Portfolio Landlord", quote: "The 6-point verification gives me peace of mind that a traditional agent's reference check never did. Room filled in 9 days.", type: "Landlord" },
              { img: "portrait-pro.png", name: "Elena, Consultant", quote: "Moved from London to Leeds. The digital profile pack meant I secured my room before I even caught the train.", type: "Tenant" }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative h-[500px] overflow-hidden rounded-sm bg-card"
              >
                <img src={`${import.meta.env.BASE_URL}images/${story.img}`} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-primary text-xs uppercase tracking-widest mb-3 block">{story.type}</span>
                  <p className="text-white text-lg font-serif italic mb-6 leading-relaxed">"{story.quote}"</p>
                  <p className="text-white/50 text-sm">{story.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE WALL */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-12">Built to survive scrutiny. Fully Compliant.</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
            {/* Minimal typographic badges representing compliance since we don't have SVGs */}
            {['UKALA', 'PRS', 'ICO', 'Tenant Fees Act 2019', 'Renters Rights Act 2025'].map((badge) => (
               <div key={badge} className="group relative cursor-help">
                  <span className="font-serif text-xl md:text-2xl text-white group-hover:text-primary transition-colors">{badge}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-5xl text-white mb-6">Ready to move?</h2>
          <p className="text-xl text-white/50 mb-12">Two different problems. One company built to solve both.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="w-full sm:w-auto min-w-[200px]">I have a room to fill</Button>
            </Link>
            <Link href="/contact?type=tenant">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-white/20 text-white hover:bg-white/5">I need a room</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
