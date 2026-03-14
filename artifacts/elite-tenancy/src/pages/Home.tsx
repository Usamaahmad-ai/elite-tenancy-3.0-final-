import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * end));
      if (p < 1) requestAnimationFrame(step);
      else setVal(end);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

const cities = [
  { id: "london",     x: 248, y: 388, name: "London",     rent: "£1,650", days: "11" },
  { id: "manchester", x: 195, y: 250, name: "Manchester",  rent: "£890",   days: "13" },
  { id: "birmingham", x: 218, y: 312, name: "Birmingham",  rent: "£820",   days: "12" },
  { id: "leeds",      x: 218, y: 234, name: "Leeds",       rent: "£780",   days: "14" },
  { id: "bristol",    x: 178, y: 388, name: "Bristol",     rent: "£960",   days: "13" },
  { id: "glasgow",    x: 170, y: 148, name: "Glasgow",     rent: "£750",   days: "15" },
  { id: "edinburgh",  x: 200, y: 134, name: "Edinburgh",   rent: "£870",   days: "14" },
  { id: "cardiff",    x: 168, y: 402, name: "Cardiff",     rent: "£790",   days: "13" },
  { id: "liverpool",  x: 185, y: 258, name: "Liverpool",   rent: "£740",   days: "14" },
  { id: "newcastle",  x: 228, y: 196, name: "Newcastle",   rent: "£720",   days: "13" },
  { id: "sheffield",  x: 220, y: 268, name: "Sheffield",   rent: "£760",   days: "14" },
  { id: "nottingham", x: 232, y: 300, name: "Nottingham",  rent: "£800",   days: "12" },
];

function UKMap() {
  const [active, setActive] = useState<string | null>(null);
  const city = cities.find(c => c.id === active);

  return (
    <section className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="label-upper mb-6">National Coverage</p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight">
              Every postcode.<br />
              <span className="text-[#C9A84C]">One service.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              We operate across the entire United Kingdom — not a regional agency with a national website. Hover any city to see live market data from our active placements.
            </p>
            {city && (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#C9A84C]/30 p-8 bg-[#0a0a0a]"
              >
                <p className="label-upper mb-3">{city.name}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Avg Room Rent</p>
                    <p className="font-serif text-3xl text-white">{city.rent}<span className="text-white/40 text-base font-sans">/mo</span></p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Avg Days to Fill</p>
                    <p className="font-serif text-3xl text-[#C9A84C]">{city.days} <span className="text-white/40 text-base font-sans">days</span></p>
                  </div>
                </div>
              </motion.div>
            )}
            {!city && (
              <p className="text-white/30 text-sm">← Hover a city on the map</p>
            )}
          </div>

          <div className="relative flex justify-center">
            <svg viewBox="0 0 400 520" className="w-full max-w-[380px]" fill="none">
              {/* Great Britain outline */}
              <path
                d="M 200,45 L 218,52 L 232,68 L 238,88 L 226,108 L 240,124 L 244,144 L 234,158 L 248,172 L 250,192 L 242,208 L 252,224 L 250,244 L 257,263 L 260,282 L 252,298 L 258,318 L 252,338 L 256,358 L 250,378 L 244,396 L 238,414 L 232,432 L 222,448 L 212,457 L 200,452 L 188,444 L 172,438 L 158,428 L 153,412 L 148,398 L 143,382 L 140,366 L 148,350 L 150,334 L 144,318 L 139,302 L 137,286 L 142,268 L 146,252 L 150,238 L 148,222 L 144,208 L 148,194 L 156,182 L 160,168 L 158,153 L 150,143 L 145,128 L 148,114 L 156,104 L 166,96 L 170,82 L 168,68 L 176,56 L 186,48 Z"
                stroke="#C9A84C"
                strokeWidth="0.8"
                strokeOpacity="0.25"
                fill="#C9A84C"
                fillOpacity="0.04"
              />
              {/* Northern Ireland */}
              <path
                d="M 120,172 L 132,166 L 140,172 L 138,184 L 128,188 L 118,184 Z"
                stroke="#C9A84C"
                strokeWidth="0.8"
                strokeOpacity="0.2"
                fill="#C9A84C"
                fillOpacity="0.03"
              />
              {/* City dots */}
              {cities.map(c => (
                <g
                  key={c.id}
                  onMouseEnter={() => setActive(c.id)}
                  onMouseLeave={() => setActive(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={c.x} cy={c.y} r={14} fill="transparent" />
                  {active === c.id && (
                    <circle cx={c.x} cy={c.y} r={10} fill="#C9A84C" fillOpacity="0.12" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="1" />
                  )}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={active === c.id ? 5 : 3.5}
                    fill={active === c.id ? "#C9A84C" : "#C9A84C"}
                    fillOpacity={active === c.id ? 1 : 0.7}
                    style={{ transition: "r 0.2s ease, fill-opacity 0.2s ease" }}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats1 = useScrollReveal();
  const split = useScrollReveal();
  const process = useScrollReveal();
  const stories = useScrollReveal();

  return (
    <div className="w-full">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
          <img
            src={`${BASE}images/drone-city.png`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            className="label-upper mb-10 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            UK-Wide Tenant Introduction Service
          </motion.p>

          <motion.h1
            className="font-serif text-[clamp(3rem,7vw,6rem)] text-white mb-8 leading-[1.0]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Your room filled in 14 days.<br />
            <em className="not-italic text-[#C9A84C]">Guaranteed.</em>
          </motion.h1>

          <motion.div
            className="brand-line max-w-sm mx-auto my-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />

          <motion.p
            className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-white/80 mb-14 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Find your room anywhere in Britain.<br />
            Pay nothing. Ever.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="min-w-[220px] tracking-widest text-xs uppercase">
                I have a room to fill
              </Button>
            </Link>
            <Link href="/contact?type=tenant">
              <Button variant="outline" size="lg" className="min-w-[220px] tracking-widest text-xs uppercase">
                I need a room
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
          <div className="relative w-[1px] h-14 bg-white/10 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-transparent to-[#C9A84C]"
              animate={{ y: ["-24px", "56px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* ─── SPLIT NARRATIVE ──────────────────────────────────── */}
      <section ref={split.ref} className="grid grid-cols-1 md:grid-cols-2">
        {/* Landlord */}
        <div className="relative min-h-[80vh] flex items-end p-12 md:p-16 lg:p-24 overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <img src={`${BASE}images/hero-landlord.png`} alt="" className="w-full h-full object-cover kb opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>
          <motion.div
            className="relative z-10 max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={split.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-upper mb-6">For Landlords</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6">
              Section 21 is gone.<br />
              <span className="text-white/50">One wrong tenant<br />costs you a year.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
              We built a six-gate verification system for the era after eviction reform. Your asset stays protected.
            </p>
            <Link href="/landlords" className="group/link inline-flex items-center gap-4 text-white hover:text-[#C9A84C] transition-colors duration-300">
              <span className="text-xs uppercase tracking-[0.2em]">See how we protect you</span>
              <motion.div
                className="h-[1px] bg-current w-10"
                whileHover={{ width: 64 }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Tenant */}
        <div className="relative min-h-[80vh] flex items-end p-12 md:p-16 lg:p-24 overflow-hidden bg-[#080808] group border-t md:border-t-0 md:border-l border-white/5">
          <div className="absolute inset-0 z-0">
            <img src={`${BASE}images/hero-tenant.png`} alt="" className="w-full h-full object-cover kb opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
          </div>
          <motion.div
            className="relative z-10 max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={split.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-upper mb-6">For Tenants</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6">
              You've paid fees to<br />
              <span className="text-white/50">be ignored.<br />That ends here.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
              We verify your profile once and match you with serious landlords across the UK. Free. Always. It's written into law.
            </p>
            <Link href="/tenants" className="group/link inline-flex items-center gap-4 text-white hover:text-[#C9A84C] transition-colors duration-300">
              <span className="text-xs uppercase tracking-[0.2em]">Build your free profile</span>
              <div className="h-[1px] bg-current w-10 transition-all duration-300 group-hover/link:w-16" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="brand-line" />

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section ref={stats1.ref} className="py-28 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
            {[
              { end: 4, suffix: "M+",  prefix: "",  label: "Landlords navigating the Renters Rights Act" },
              { end: 12, suffix: "M",  prefix: "",  label: "Private renters in the United Kingdom" },
              { end: 14, suffix: "",   prefix: "",  label: "Average days to fill a room. Guaranteed." },
              { end: 0,  suffix: "",   prefix: "£", label: "Charged to tenants. Always. By law." },
              { end: 6,  suffix: "",   prefix: "",  label: "Documents verified per tenant application" },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="bg-[#040404] p-10 flex flex-col"
                initial={{ opacity: 0 }}
                animate={stats1.inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-white mb-3 leading-none">
                  <Counter end={s.end} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="w-8 h-[1px] bg-[#C9A84C] mb-4" />
                <p className="text-white/40 text-xs leading-relaxed uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marquee compliance bar */}
        <div className="mt-16 border-t border-white/5 pt-6 overflow-hidden">
          <div className="flex whitespace-nowrap">
            <div className="marquee-track flex shrink-0 gap-16 pr-16 items-center">
              {Array(2).fill([
                "UKALA REGISTERED",
                "PRS MEMBER",
                "ICO COMPLIANT",
                "TENANT FEES ACT 2019",
                "RENTERS RIGHTS ACT 2025",
                "ZERO TENANT FEES",
                "14-DAY GUARANTEE",
                "UK-WIDE COVERAGE",
                "6-POINT VERIFICATION",
              ]).flat().map((item, i) => (
                <span key={i} className="text-[10px] uppercase tracking-[0.3em] text-white/20 shrink-0">
                  {item} <span className="text-[#C9A84C]/40 ml-16">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── UK MAP ───────────────────────────────────────────── */}
      <UKMap />

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section ref={process.ref} className="py-32 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <p className="label-upper mb-6">The Process</p>
            <h2 className="font-serif text-5xl text-white leading-tight">
              Three steps from empty room to signed tenancy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                n: "01",
                title: "Submit your property",
                body: "Three fields. Postcode, monthly rent, available from. We take it from there within four hours.",
              },
              {
                n: "02",
                title: "We verify and match",
                body: "Six-gate verification. Biometric identity, open banking, Right to Rent, employer call, Land Registry. No corners cut.",
              },
              {
                n: "03",
                title: "Tenancy signed",
                body: "A fully verified tenant. A signed agreement. One invoice. No ongoing fees, no management percentage.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-background p-12 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={process.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-serif text-[4rem] text-[#C9A84C]/20 leading-none mb-8 select-none">
                  {step.n}
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">{step.title}</h3>
                <div className="w-8 h-[1px] bg-[#C9A84C] mb-6" />
                <p className="text-white/50 leading-relaxed text-sm">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HUMAN STORIES ────────────────────────────────────── */}
      <section ref={stories.ref} className="py-32 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="label-upper mb-6">Real Outcomes</p>
              <h2 className="font-serif text-5xl text-white">Zero friction.<br />Real lives.</h2>
            </div>
            <Link href="/why-us" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-[#C9A84C] transition-colors border-b border-white/10 pb-1 shrink-0">
              Read all stories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                img: "portrait-nurse.png",
                quote: "Working nights, I couldn't do viewings. They built my profile, found the flat, and I paid nothing.",
                name: "Sarah M.",
                role: "NHS Nurse — Manchester",
                tag: "Tenant",
              },
              {
                img: "portrait-landlord.png",
                quote: "The 6-point verification gives peace of mind a traditional reference check never could. Room filled in 9 days.",
                name: "David K.",
                role: "Portfolio Landlord — Leeds",
                tag: "Landlord",
              },
              {
                img: "portrait-pro.png",
                quote: "Moved from London to Bristol. The digital profile meant I had the room secured before I caught the train.",
                name: "Elena R.",
                role: "Consultant — Bristol",
                tag: "Tenant",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="relative h-[600px] overflow-hidden bg-black group"
                initial={{ opacity: 0 }}
                animate={stories.inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: i * 0.15 }}
              >
                <img
                  src={`${BASE}images/${s.img}`}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700 kb"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="label-upper mb-5">{s.tag}</p>
                  <p className="font-serif text-xl text-white leading-snug mb-6 italic">
                    &ldquo;{s.quote}&rdquo;
                  </p>
                  <div className="w-8 h-[1px] bg-[#C9A84C] mb-4" />
                  <p className="text-white/60 text-sm">{s.name}</p>
                  <p className="text-white/30 text-xs mt-1">{s.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE ───────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-white/25 text-[10px] uppercase tracking-[0.3em] mb-12">
            Built to survive scrutiny
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
            {[
              { name: "UKALA", desc: "UK Association of Letting Agents — Full Member" },
              { name: "PRS", desc: "Property Redress Scheme — Formally registered" },
              { name: "ICO", desc: "Information Commissioner — Your data is UK-protected" },
              { name: "Tenant Fees Act", desc: "We are prohibited by law from charging you fees" },
              { name: "Renters Rights Act", desc: "Operating under the most current UK legislation" },
            ].map((c) => (
              <div key={c.name} className="group bg-[#040404] p-8 flex flex-col gap-4 hover:bg-[#080808] transition-colors cursor-default">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                <p className="font-serif text-white text-lg leading-snug">{c.name}</p>
                <p className="text-white/30 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="label-upper mb-10">Two problems. One company.</p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-white mb-6 leading-tight">
            Ready to move forward?
          </h2>
          <p className="text-white/40 text-lg mb-16 font-serif italic">
            Two different problems. One company built to solve both.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="min-w-[220px] tracking-widest text-xs uppercase">
                I have a room to fill
              </Button>
            </Link>
            <Link href="/contact?type=tenant">
              <Button variant="outline" size="lg" className="min-w-[220px] tracking-widest text-xs uppercase">
                I need a room
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
