import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const EXAMPLES = [
  { rent: 700,  label: "Studio room, Northern cities" },
  { rent: 950,  label: "Double room, Midlands" },
  { rent: 1300, label: "Ensuite, South England" },
];

const FAQS = [
  { q: "When do I pay the fee?", a: "Only on successful placement. If we don't fill your room, you pay nothing." },
  { q: "Are there any hidden charges?", a: "No. One fee. No management, no renewal, no admin, no VAT surprises. The calculator shows exactly what you pay." },
  { q: "What if the tenant leaves early?", a: "If your tenant vacates within 30 days of moving in, we find a replacement at no additional charge. In writing." },
  { q: "Can I negotiate the fee?", a: "No. The formula is the formula. It's the same for every landlord — that's what makes it fair and transparent." },
  { q: "How do I pay?", a: "Bank transfer on the day the tenancy agreement is signed. Not a day before." },
  { q: "Does the fee include VAT?", a: "The figure our calculator shows is the total you pay. No additional VAT is added on top." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <span className="font-serif text-lg text-white group-hover:text-[#C9A84C] transition-colors">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-white/30 shrink-0 ml-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-6 pl-0 border-l-2 border-[#C9A84C]/30 pl-5 ml-0">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Bar({ height, label, amount, gold }: { height: number; label: string; amount: string; gold?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center">
        <p className={`font-serif text-xl ${gold ? "text-[#C9A84C]" : "text-white/60"}`}>{amount}</p>
        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{label}</p>
      </div>
      <div ref={ref} className="w-20 bg-white/5 relative" style={{ height: 180 }}>
        <motion.div
          className={`absolute bottom-0 left-0 right-0 ${gold ? "bg-[#C9A84C]" : "bg-white/15"}`}
          initial={{ height: 0 }}
          animate={inView ? { height: `${height}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Pricing() {
  const [rent, setRent] = useState(950);
  const [inputVal, setInputVal] = useState("950");
  const calcRef = useRef<HTMLDivElement>(null);
  const inView = useInView(calcRef, { once: true });

  const ourFee = (rent * 12) / 52 * 2;
  const tradFee = rent * 12 * 0.10;
  const saving = tradFee - ourFee;
  const barRatio = ourFee / tradFee;

  const handleInput = (v: string) => {
    setInputVal(v);
    const n = parseInt(v.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(n) && n >= 100 && n <= 20000) setRent(n);
  };

  const handleSlider = (v: number) => {
    setRent(v);
    setInputVal(String(v));
  };

  const calcInView = useInView(calcRef, { once: true });

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="w-full bg-background pt-24">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-upper mb-8">Transparent Pricing</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-white leading-tight mb-8">
              Complete<br />transparency.
            </h1>
            <div className="brand-line max-w-xs mb-8" />
            <p className="text-white/50 text-xl font-serif italic leading-snug max-w-sm">
              The property industry hides behind percentages.<br />We use absolute numbers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-px bg-white/5"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-background p-12 flex flex-col justify-center">
              <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-6">For Tenants</p>
              <div className="font-serif text-[5rem] text-[#C9A84C] leading-none mb-4">£0</div>
              <div className="w-8 h-[1px] bg-[#C9A84C] mb-4" />
              <p className="text-white/40 text-sm">Always. Forever. By law.</p>
            </div>
            <div className="bg-[#060606] p-12 flex flex-col justify-center">
              <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-6">For Landlords</p>
              <div className="space-y-3">
                {[
                  { step: "Monthly rent", op: "×12" },
                  { step: "Annual rent", op: "÷52" },
                  { step: "Weekly rent", op: "×2" },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 10 }}
                    animate={heroInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
                  >
                    <span className="text-white/40 text-sm">{row.step}</span>
                    <span className="font-serif text-xl text-white">{row.op}</span>
                  </motion.div>
                ))}
                <div className="h-[1px] bg-white/10 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Your fee</span>
                  <span className="font-serif text-xl text-[#C9A84C]">≈ 2 weeks rent</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CALCULATOR ───────────────────────────────────────── */}
      <section className="py-20 bg-[#040404] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={calcRef}>
          <div className="text-center mb-16">
            <p className="label-upper mb-6">Interactive Calculator</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Your exact fee to the penny.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
            {/* INPUT SIDE */}
            <div className="bg-[#070707] p-10 md:p-14 flex flex-col gap-10">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6">Monthly rent amount</p>
                <div className="flex items-baseline gap-2 border-b border-white/10 pb-4">
                  <span className="font-serif text-5xl text-white/40">£</span>
                  <input
                    type="number"
                    value={inputVal}
                    onChange={e => handleInput(e.target.value)}
                    onBlur={() => setInputVal(String(rent))}
                    className="font-serif text-5xl text-white bg-transparent border-none outline-none w-full min-w-0"
                    min={100}
                    max={20000}
                    style={{ appearance: "textfield" }}
                  />
                  <span className="text-white/20 text-sm shrink-0">/mo</span>
                </div>
                <input
                  type="range"
                  min={400}
                  max={5000}
                  step={50}
                  value={Math.min(rent, 5000)}
                  onChange={e => handleSlider(Number(e.target.value))}
                  className="gold-slider mt-6 w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-white/20 text-xs">£400</span>
                  <span className="text-white/20 text-xs">£5,000</span>
                </div>
              </div>

              {/* Quick examples */}
              <div>
                <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">Quick examples</p>
                <div className="flex flex-col gap-2">
                  {EXAMPLES.map(ex => (
                    <button
                      key={ex.rent}
                      onClick={() => { setRent(ex.rent); setInputVal(String(ex.rent)); }}
                      className={`flex justify-between items-center px-4 py-3 text-left transition-colors text-sm border ${
                        rent === ex.rent
                          ? "border-[#C9A84C]/40 bg-[#C9A84C]/5 text-white"
                          : "border-white/5 text-white/40 hover:border-white/15 hover:text-white/70"
                      }`}
                    >
                      <span className="text-xs">{ex.label}</span>
                      <span className="font-serif text-base">£{ex.rent}/mo</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS SIDE */}
            <div className="bg-[#0a0a0a] p-10 md:p-14 flex flex-col justify-between gap-10">
              {/* Formula breakdown */}
              <div className="space-y-4">
                <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-6">Calculation breakdown</p>
                {[
                  { label: "Monthly rent", val: `£${rent.toLocaleString()}`, muted: false },
                  { label: "Annual rent (× 12)", val: `£${(rent * 12).toLocaleString()}`, muted: true },
                  { label: "Weekly rent (÷ 52)", val: `£${(rent * 12 / 52).toFixed(2)}`, muted: true },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <span className={`text-sm ${row.muted ? "text-white/30" : "text-white/60"}`}>{row.label}</span>
                    <span className={`font-serif text-lg ${row.muted ? "text-white/30" : "text-white"}`}>{row.val}</span>
                  </motion.div>
                ))}

                <motion.div
                  className="flex justify-between items-center py-4 border-t border-[#C9A84C]/20 mt-2"
                  layout
                  key={ourFee}
                >
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Your placement fee (× 2)</p>
                    <p className="text-white/30 text-xs mt-1">One-time · On successful placement only</p>
                  </div>
                  <motion.div
                    key={ourFee}
                    initial={{ scale: 0.95, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-right"
                  >
                    <p className="font-serif text-4xl text-[#C9A84C]">
                      £{ourFee.toFixed(2)}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bar chart comparison */}
              <div>
                <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-8">vs. traditional agent</p>
                <div className="flex items-end justify-center gap-16 mb-6">
                  <Bar
                    height={100}
                    label="Traditional Agent"
                    amount={`£${tradFee.toFixed(0)}`}
                  />
                  <Bar
                    height={Math.max(barRatio * 100, 8)}
                    label="Elite Tenancy"
                    amount={`£${ourFee.toFixed(0)}`}
                    gold
                  />
                </div>
                <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/15 p-4 text-center">
                  <p className="text-[#C9A84C] font-serif text-sm">
                    You save <span className="text-lg">£{saving.toFixed(2)}</span> in year one
                  </p>
                  <p className="text-white/30 text-xs mt-1">Based on 10% annual management fee industry average</p>
                </div>
              </div>

              <Link href="/contact?type=landlord">
                <Button variant="gold" className="w-full tracking-widest text-xs uppercase h-13">
                  Proceed with £{ourFee.toFixed(0)} fee
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-32 max-w-3xl mx-auto px-6 lg:px-8">
        <p className="label-upper mb-8">Common Questions</p>
        <h2 className="font-serif text-4xl text-white mb-16">Every money question. Answered honestly.</h2>
        {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        <div className="mt-16 text-center">
          <Link href="/contact?type=landlord">
            <Button variant="gold" size="lg" className="tracking-widest text-xs uppercase min-w-[240px]">
              Get started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
