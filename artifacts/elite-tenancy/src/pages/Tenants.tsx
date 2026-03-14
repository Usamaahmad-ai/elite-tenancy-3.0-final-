import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL;

const PROFILE_TABS = [
  { id: "identity",  label: "Identity",      content: "Government-issued photo ID verified biometrically. Passport, driving licence, BRP — all accepted. Captures in under 60 seconds via your phone." },
  { id: "income",    label: "Income",        content: "Open Banking connection. Not PDFs. We read your actual account statements directly — income, outgoings, transaction patterns. Precise and tamper-proof." },
  { id: "work",      label: "Employment",    content: "Your payslips cross-referenced with your bank entries. We also call your employer directly to confirm your position and contract type." },
  { id: "rtr",       label: "Right to Rent", content: "Direct Home Office check. Confirms your legal right to rent in England. Expiry-aware for time-limited statuses." },
  { id: "reference", label: "Reference",     content: "We verify your previous landlord exists via Land Registry before taking their word. The reference only counts if the referee is confirmed as your actual landlord." },
  { id: "history",   label: "Credit",        content: "Soft credit footprint. Won't affect your credit score. Checks for CCJs, IVAs, and recent defaults relevant to tenancy." },
];

const MONEY_STEPS = [
  { who: "Landlord", action: "Pays the one-time placement fee to Elite Tenancy", amount: "≈ 2 weeks rent", zero: false },
  { who: "Tenant",   action: "Pays zero. Nothing. £0 to Elite Tenancy.",         amount: "£0",            zero: true },
  { who: "Landlord", action: "Receives full monthly rent directly from tenant",  amount: "100% rent",     zero: false },
];

export default function Tenants() {
  const [activeTab, setActiveTab] = useState("identity");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const moneyRef = useRef<HTMLDivElement>(null);
  const moneyInView = useInView(moneyRef, { once: true });

  return (
    <div className="w-full bg-background pt-24">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={`${BASE}images/hero-tenant.png`} alt="City skyline" className="w-full h-full object-cover opacity-40 kb" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 w-full">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl ml-auto text-right"
          >
            <p className="label-upper mb-10 text-right">For Tenants</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-white leading-tight mb-8">
              The rental market charges<br />you to find a home.<br />
              <em className="not-italic text-[#C9A84C]">We think that's wrong.</em>
            </h1>
            <div className="brand-line max-w-xs mb-10 ml-auto" />
            <p className="text-white/50 text-xl leading-relaxed max-w-xl mb-12 ml-auto">
              Create your verified profile once. Get matched with landlords across the UK. Pay absolutely nothing to us. Ever.
            </p>
            <Link href="/contact?type=tenant">
              <Button variant="gold" size="lg" className="tracking-widest text-xs uppercase min-w-[220px]">
                Build your free profile
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── THE ZERO FEE PROMISE ─────────────────────────────── */}
      <section ref={moneyRef} className="py-32 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="label-upper mb-6">The Promise</p>
              <h2 className="font-serif text-5xl text-white leading-tight mb-8">
                You pay us nothing.<br />
                <span className="text-white/40">And this is why.</span>
              </h2>
              <p className="text-white/50 leading-relaxed text-lg mb-10 max-w-lg">
                The Tenant Fees Act 2019 makes it illegal for us to charge you. But we'd have done it anyway. The landlord has the asset. The landlord pays to protect it. That's the right way around.
              </p>
              <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 p-8">
                <p className="font-serif text-3xl text-[#C9A84C] mb-2">£0.00</p>
                <p className="text-white/40 text-sm">The total you will ever pay to Elite Tenancy. Not now. Not on renewal. Not ever.</p>
              </div>
            </div>

            <div className="flex flex-col gap-px">
              {MONEY_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={moneyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-8 flex justify-between items-center gap-6 ${step.zero ? "bg-[#0a0a0a] border border-[#C9A84C]/20" : "bg-[#060606]"}`}
                >
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{step.who}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{step.action}</p>
                  </div>
                  <div className={`font-serif shrink-0 ${step.zero ? "text-[#C9A84C] text-4xl" : "text-white/30 text-2xl"}`}>
                    {step.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE VERIFIED PROFILE ─────────────────────────────── */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="label-upper mb-6">Your Tenant Profile</p>
            <h2 className="font-serif text-5xl text-white leading-tight">
              Verified once.<br />
              <span className="text-white/40">Opens every door.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-px border-r border-white/5">
              {PROFILE_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-8 py-5 flex justify-between items-center group transition-all ${
                    activeTab === tab.id
                      ? "bg-[#C9A84C]/5 border-l-2 border-[#C9A84C]"
                      : "border-l-2 border-transparent hover:border-white/15"
                  }`}
                >
                  <span className={`font-sans text-sm transition-colors ${activeTab === tab.id ? "text-white" : "text-white/35 group-hover:text-white/60"}`}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[280px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {PROFILE_TABS.filter(t => t.id === activeTab).map(tab => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="label-upper mb-6">{tab.label}</p>
                    <p className="font-serif text-2xl text-white leading-relaxed mb-8">{tab.content}</p>
                    <div className="w-8 h-[1px] bg-[#C9A84C]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { q: "How long does it take?", a: "Most profiles are complete in under 20 minutes on your phone." },
              { q: "How many times do I verify?", a: "Once. We present your verified profile to every landlord we match you with." },
              { q: "Does this affect my credit score?", a: "No. The credit check is a soft inquiry — invisible to lenders and landlords." },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-4">{item.q}</p>
                <p className="font-serif text-2xl text-white leading-snug">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PERSONAS ─────────────────────────────────────────── */}
      <section className="py-32 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <p className="label-upper mb-6">Who We Work With</p>
            <h2 className="font-serif text-5xl text-white leading-tight">
              If you rent a room,<br />
              <span className="text-white/40">we work for you.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                img: "portrait-nurse.png",
                title: "Healthcare professionals",
                quote: "Working nights, I couldn't do viewings. They built my profile, found the flat, and I paid nothing.",
                name: "Sarah M.",
                role: "NHS Nurse — Manchester",
              },
              {
                img: "portrait-pro.png",
                title: "Relocating professionals",
                quote: "Moved from London to Bristol. The digital profile meant I had the room secured before I caught the train.",
                name: "Elena R.",
                role: "Consultant — Bristol",
              },
              {
                img: "portrait-landlord.png",
                title: "International arrivals",
                quote: "No UK credit history. No references. They built my profile from scratch and matched me in 10 days.",
                name: "Kwame A.",
                role: "Software Engineer — Birmingham",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="relative h-[500px] overflow-hidden bg-black group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <img
                  src={`${BASE}images/${p.img}`}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700 kb"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="label-upper mb-4">{p.title}</p>
                  <p className="font-serif text-lg text-white leading-snug mb-5 italic">"{p.quote}"</p>
                  <div className="w-8 h-[1px] bg-[#C9A84C] mb-4" />
                  <p className="text-white/60 text-sm">{p.name}</p>
                  <p className="text-white/30 text-xs mt-0.5">{p.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-40 bg-background relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="label-upper mb-10">Your next room, free</p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-white mb-6 leading-tight">
            Ready to build your<br />verified profile?
          </h2>
          <p className="text-white/40 mb-14 font-serif italic text-xl">
            20 minutes. Zero cost. Zero fees. Rooms nationwide.
          </p>
          <Link href="/contact?type=tenant">
            <Button variant="gold" size="lg" className="min-w-[260px] tracking-widest text-xs uppercase">
              Start my free profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
