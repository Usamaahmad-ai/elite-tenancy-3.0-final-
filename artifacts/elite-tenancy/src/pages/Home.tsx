import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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

  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const mapCities = [
    { x: 220, y: 380, name: 'London', rent: '1650', days: '11' },
    { x: 175, y: 245, name: 'Manchester', rent: '890', days: '13' },
    { x: 200, y: 305, name: 'Birmingham', rent: '820', days: '12' },
    { x: 205, y: 230, name: 'Leeds', rent: '780', days: '14' },
    { x: 160, y: 380, name: 'Bristol', rent: '960', days: '13' },
    { x: 150, y: 140, name: 'Glasgow', rent: '750', days: '15' },
    { x: 185, y: 125, name: 'Edinburgh', rent: '870', days: '14' },
    { x: 145, y: 390, name: 'Cardiff', rent: '790', days: '13' },
    { x: 165, y: 245, name: 'Liverpool', rent: '740', days: '14' },
    { x: 210, y: 185, name: 'Newcastle', rent: '720', days: '13' },
    { x: 205, y: 255, name: 'Sheffield', rent: '760', days: '14' },
    { x: 215, y: 290, name: 'Nottingham', rent: '800', days: '12' }
  ];

  const landlordWords = "Section 21 is gone. One wrong tenant now costs you a year of your life.".split(" ");
  const tenantWords = "You've paid fees to be ignored. That ends here.".split(" ");

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>

        {/* Ghost City Names */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[10%] right-[-5%] font-serif text-[120px] text-white/[0.025] drift-1">LONDON</div>
          <div className="absolute bottom-[10%] left-[-5%] font-serif text-[120px] text-white/[0.025] drift-2">MANCHESTER</div>
          <div className="absolute top-[20%] left-[5%] font-serif text-[100px] text-white/[0.025] drift-3">EDINBURGH</div>
          <div className="absolute bottom-[20%] right-[10%] font-serif text-[100px] text-white/[0.025] drift-4">BRISTOL</div>
        </div>

        {/* Animated Gold Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/20 gold-glow-pulse z-0 pointer-events-none" />

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
                <Button variant="gold" size="lg" className="w-full sm:w-auto min-w-[200px] shimmer-btn">I have a room to fill</Button>
              </Link>
              <span className="text-white/30 text-sm font-serif italic">or</span>
              <Link href="/contact?type=tenant">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-white/20 text-white hover:bg-white/5 shimmer-btn">I need a room</Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs text-white/30 mb-4 uppercase tracking-widest">Scroll</span>
          <div className="relative w-[1px] h-12">
             <div className="scroll-line-pulse" />
          </div>
        </div>
      </section>

      {/* SPLIT NARRATIVE */}
      <section className="relative bg-background overflow-hidden min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Landlord Side */}
        <div className="relative p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 group overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}images/hero-landlord.png`} alt="Empty premium room" className="w-full h-full object-cover opacity-35 grayscale ken-burns-img" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
          
          <motion.div 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-4 border border-primary/0 group-hover:border-primary/30 transition-colors duration-1000 z-10 pointer-events-none"
          />

          <div className="relative z-10 max-w-md ml-auto">
            <h3 className="text-primary tracking-widest uppercase text-sm mb-6">For Landlords</h3>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-white mb-6">
              {landlordWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  className={word.includes("Section") || word.includes("21") || word.includes("costs") ? "text-white/50 " : ""}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h2>
            <p className="text-white/60 mb-8 text-lg leading-relaxed">
              The rules changed. The risk multiplied. We built a 6-point verification system to protect your asset in the new era of renting.
            </p>
            <Link href="/landlords" className="group/link flex items-center text-primary hover:text-white transition-colors">
              <span className="mr-4 uppercase tracking-wider text-sm">See how we protect you</span>
              <motion.div 
                 initial={{ width: 48 }}
                 whileHover={{ width: 64 }}
                 className="h-[1px] bg-primary group-hover/link:bg-white transition-colors duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Tenant Side */}
        <div className="relative p-12 md:p-24 flex flex-col justify-center bg-[#0d0d0d] group overflow-hidden">
           <div className="absolute inset-0 z-0 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}images/hero-tenant.png`} alt="Tenant arriving" className="w-full h-full object-cover opacity-35 grayscale ken-burns-img" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]" />
          </div>

          <motion.div 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-4 border border-primary/0 group-hover:border-primary/30 transition-colors duration-1000 z-10 pointer-events-none"
          />

          <div className="relative z-10 max-w-md mr-auto">
            <h3 className="text-primary tracking-widest uppercase text-sm mb-6">For Tenants</h3>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-white mb-6">
              {tenantWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  className={word.includes("paid") || word.includes("ignored") ? "text-white/50 " : ""}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h2>
            <p className="text-white/60 mb-8 text-lg leading-relaxed">
              We don't charge you to find a home. We build your profile once, verify it, and match you with premium properties nationwide. For free. Always.
            </p>
            <Link href="/tenants" className="group/link flex items-center text-primary hover:text-white transition-colors">
              <span className="mr-4 uppercase tracking-wider text-sm">Create your free profile</span>
              <motion.div 
                 initial={{ width: 48 }}
                 whileHover={{ width: 64 }}
                 className="h-[1px] bg-primary group-hover/link:bg-white transition-colors duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* THE STATS */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {[
              { num: 4, suffix: "M+", label: "Landlords navigating the Renters Rights Act" },
              { num: 12, suffix: "M", label: "Private renters in the UK" },
              { num: 14, suffix: "", label: "Days average time to fill a room" },
              { num: 0, suffix: "", prefix: "£", label: "Tenant fees. Always." },
              { num: 6, suffix: "", label: "Documents verified per tenant" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="flex items-start">
                  {stat.prefix && <span className="text-3xl text-primary mt-2 mr-1">{stat.prefix}</span>}
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} duration={2 + i * 0.2} />
                </div>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-12 h-px bg-primary/50 my-4"
                />
                <p className="text-white/50 text-sm uppercase tracking-widest leading-relaxed max-w-[180px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="w-full bg-[#111] border-y border-white/5 py-4 overflow-hidden relative">
          <div className="flex whitespace-nowrap marquee-track">
            <span className="text-white/40 text-sm tracking-[0.2em] font-serif px-4">
              UKALA REGISTERED · PRS MEMBER · ICO COMPLIANT · TENANT FEES ACT 2019 · RENTERS RIGHTS ACT 2025 · ZERO TENANT FEES · 14-DAY GUARANTEE · UK-WIDE COVERAGE · 6-POINT VERIFICATION · 
            </span>
            <span className="text-white/40 text-sm tracking-[0.2em] font-serif px-4">
              UKALA REGISTERED · PRS MEMBER · ICO COMPLIANT · TENANT FEES ACT 2019 · RENTERS RIGHTS ACT 2025 · ZERO TENANT FEES · 14-DAY GUARANTEE · UK-WIDE COVERAGE · 6-POINT VERIFICATION · 
            </span>
          </div>
        </div>
      </section>

      {/* UK MAP SECTION */}
      <section className="py-32 bg-[#030303] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl text-center text-white mb-20">Operating across every postcode.</h2>
          
          <div className="relative max-w-sm mx-auto">
            <svg viewBox="0 0 400 520" className="w-full h-auto">
              <path 
                d="M 190,50 L 210,55 L 225,70 L 230,90 L 220,110 L 235,125 L 240,145 L 230,160 L 245,175 L 248,195 L 240,210 L 250,225 L 248,245 L 255,265 L 258,285 L 250,300 L 255,320 L 250,340 L 255,360 L 248,380 L 240,395 L 235,415 L 230,435 L 220,450 L 210,460 L 200,455 L 190,445 L 175,440 L 160,430 L 155,415 L 150,400 L 145,385 L 140,370 L 148,355 L 150,340 L 145,325 L 140,310 L 138,295 L 142,280 L 145,265 L 150,250 L 148,235 L 145,220 L 148,205 L 155,195 L 160,180 L 158,165 L 150,155 L 145,140 L 148,125 L 155,115 L 165,108 L 170,95 L 168,80 L 175,68 L 182,58 Z" 
                fill="rgba(201,168,76,0.05)" 
                stroke="rgba(201,168,76,0.3)" 
                strokeWidth="1"
              />
              
              {mapCities.map((city, i) => (
                <g 
                  key={i} 
                  transform={`translate(${city.x}, ${city.y})`}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className="cursor-pointer"
                >
                  <circle r="8" fill="rgba(201,168,76,0.3)" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <circle r="4" fill="#C9A84C" />
                </g>
              ))}
            </svg>

            {hoveredCity && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                {mapCities.filter(c => c.name === hoveredCity).map((city, idx) => (
                  <div key={idx} className="bg-[#111] border border-primary p-4 shadow-2xl min-w-[200px]">
                    <h4 className="font-serif text-2xl text-white mb-2">{city.name}</h4>
                    <div className="text-white/60 text-sm mb-1">Avg Rent: <span className="text-primary font-bold">£{city.rent}</span></div>
                    <div className="text-white/60 text-sm">Avg Days to Fill: <span className="text-white font-bold">{city.days}</span></div>
                  </div>
                ))}
              </div>
            )}
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
                className="group relative h-[500px] overflow-hidden rounded-sm bg-card border border-white/5"
              >
                <img src={`${import.meta.env.BASE_URL}images/${story.img}`} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 opacity-80 group-hover:opacity-100 ken-burns-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Shimmer sweep line */}
                <div className="absolute top-0 bottom-0 left-[-100%] w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite]" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-primary text-xs uppercase tracking-widest mb-3 block">{story.type}</span>
                  <p className="text-white text-lg font-serif italic mb-6 leading-relaxed">
                    {story.quote.split(" ").map((w, j) => (
                       <motion.span 
                         key={j}
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.5 + (j * 0.05) }}
                       >
                         {w}{" "}
                       </motion.span>
                    ))}
                  </p>
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
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {[
              { badge: 'UKALA', desc: 'UK Association of Letting Agents — Full Member' },
              { badge: 'PRS', desc: 'Property Redress Scheme — Registered' },
              { badge: 'ICO', desc: 'Information Commissioner — Data protected under UK law' },
              { badge: 'Tenant Fees Act 2019', desc: 'We cannot charge you fees — by law' },
              { badge: 'Renters Rights Act 2025', desc: 'Operating under the latest legislation' }
            ].map((item, i) => (
               <div key={i} className="group relative bg-[#111] border-t-2 border-primary/50 p-6 w-full md:w-[280px] hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                     <span className="font-serif text-xl text-white group-hover:text-primary transition-colors">{item.badge}</span>
                  </div>
                  <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4 text-sm text-white/50">
                    {item.desc}
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center font-serif text-[15vw] leading-none text-white/[0.02] pointer-events-none select-none z-0">
          <div>ELITE</div>
          <div>TENANCY</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Ready to move?</h2>
          <p className="text-xl text-white/50 mb-12">Two different problems. One company built to solve both.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="w-full sm:w-auto min-w-[200px] shimmer-btn">I have a room to fill</Button>
            </Link>
            <Link href="/contact?type=tenant">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-white/20 text-white hover:bg-white/5 shimmer-btn">I need a room</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
