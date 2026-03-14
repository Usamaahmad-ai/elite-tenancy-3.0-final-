import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const DOCS = [
  { n: "01", title: "Identity", front: "Biometric match against government-issued photo ID.", back: "Catches synthetic identities, stolen IDs, and facial substitution fraud — the most common form of tenancy fraud in the UK." },
  { n: "02", title: "Right to Rent", front: "Direct Home Office verification. No third-party middleware.", back: "Expiry-aware. We flag time-limited right to rent before it causes a compliance breach for you." },
  { n: "03", title: "Bank Statements", front: "Open Banking connection. We don't accept uploaded PDFs.", back: "PDFs can be edited in under 60 seconds. Open Banking cannot be faked. We only accept the real data." },
  { n: "04", title: "Payslips", front: "Three months reviewed and cross-referenced with banking data.", back: "If the payslip says £3,200/mo but only £1,800 hits the account every month, we know before you do." },
  { n: "05", title: "Employer Call", front: "We call HR directly. Not email. Not a form. A live phone call.", back: "We verify the company, confirm the position, and ask the questions a reference letter never answers." },
  { n: "06", title: "Landlord Reference", front: "We verify the previous landlord via Land Registry before taking their word.", back: "Anyone can claim to be a landlord. We confirm ownership before the reference means anything." },
];

const RRA_EVENTS = [
  { date: "Jun 2023",  title: "Renters Reform Bill introduced",       body: "The government introduces the most significant reform to English rental law in 30 years." },
  { date: "May 2024", title: "Second reading passes",                 body: "Section 21 'no-fault' eviction abolition is confirmed as central to the Bill." },
  { date: "Jan 2025", title: "Royal Assent granted",                  body: "The Renters Rights Act becomes law. Implementation timeline begins." },
  { date: "Apr 2025", title: "Phase 1 — new tenancies",              body: "All new tenancies are created under the Act's new rules. Fixed terms replaced with rolling periodic tenancies." },
  { date: "Oct 2025", title: "Phase 2 — all tenancies converted",    body: "Every existing tenancy is brought under the new rules. Section 21 is formally and permanently abolished." },
];

const OBJECTIONS = [
  { q: "We already use a local letting agent.",          a: "A letting agent manages your property. We find your tenant. These aren't competing services — many of our landlords use both. We hand off after placement." },
  { q: "How do I know the tenant will stay?",           a: "We offer a 30-day replacement guarantee. If your tenant vacates within 30 days of moving in, we source a replacement at no additional charge. In writing." },
  { q: "What if you don't fill it in 14 days?",         a: "We refund your fee in full. No questions. This guarantee is in the placement agreement." },
  { q: "We've had bad experiences with reference checks.", a: "Because a reference check is one letter from one person who may or may not own the property. We run six parallel verification gates. It's a different process." },
  { q: "How can you cover all of the UK?",              a: "We don't need offices in every city. Our verification is entirely digital. Our network is national. Our process was built to work remotely without losing rigor." },
  { q: "What exactly do your fees cover?",              a: "Introduction only. We find, verify, and present the tenant. You manage the tenancy from day one. We step back entirely." },
  { q: "Do I need to sign a long contract?",            a: "No. A single placement agreement per property listing. No rolling commitments, no minimum terms, no cancellation penalties." },
  { q: "What types of property do you cover?",          a: "Rooms within HMOs, single-let properties, and professional house shares. We specialise in the room rental market." },
  { q: "How quickly will you start marketing my room?", a: "Within 24 hours of receiving your property submission." },
  { q: "What areas of the UK do you cover?",            a: "All of England, Scotland, Wales, and Northern Ireland. If there's a postcode, we can cover it." },
  { q: "Are you regulated?",                            a: "Yes. UKALA Full Member. PRS registered. ICO registered. Tenant Fees Act 2019 compliant. Renters Rights Act 2025 compliant." },
  { q: "I have multiple properties.",                   a: "Volume landlords receive priority placement and a dedicated point of contact. Contact us directly to discuss a portfolio arrangement." },
];

function FlipCard({ doc }: { doc: typeof DOCS[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="perspective h-64 cursor-pointer"
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-700"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-[#080808] border border-white/5 hover:border-[#C9A84C]/20 transition-colors p-8 flex flex-col justify-between">
          <span className="font-serif text-[5rem] text-white/[0.04] leading-none select-none absolute bottom-2 right-4">{doc.n}</span>
          <p className="label-upper">{doc.n}</p>
          <div>
            <h3 className="font-serif text-2xl text-white mb-3">{doc.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{doc.front}</p>
          </div>
          <p className="text-[#C9A84C]/50 text-xs uppercase tracking-[0.2em]">Click to reveal ↗</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden my-rotate-y-180 bg-[#C9A84C] p-8 flex flex-col justify-between">
          <p className="text-black/40 text-xs uppercase tracking-[0.2em] font-medium">The fraud it prevents</p>
          <p className="font-serif text-xl text-black leading-snug">{doc.back}</p>
          <p className="text-black/40 text-xs uppercase tracking-[0.2em]">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-5 text-left group"
      >
        <span className="text-white/70 group-hover:text-white transition-colors text-sm leading-relaxed pr-4 font-sans">
          {String(index + 1).padStart(2, "0")}. {q}
        </span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <span className="text-[#C9A84C] text-xl shrink-0">+</span>
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
            <p className="text-white/40 text-sm leading-relaxed pb-6 border-l border-[#C9A84C]/30 pl-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Landlords() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const docsRef = useRef<HTMLDivElement>(null);
  const docsInView = useInView(docsRef, { once: true, margin: "-80px" });
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <div className="w-full bg-background pt-24">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={`${BASE}images/hero-landlord.png`} alt="Empty room" className="w-full h-full object-cover opacity-45 kb" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 w-full">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="label-upper mb-10">For Landlords</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-white leading-tight mb-8">
              Every day this room is empty costs you money.<br />
              <em className="not-italic text-[#C9A84C]">Every wrong tenant costs you much more.</em>
            </h1>
            <div className="brand-line max-w-xs mb-10" />
            <p className="text-white/50 text-xl leading-relaxed max-w-xl mb-12">
              We charge one fee to fill your property with a verified tenant in 14 days. No management. No renewal. No hidden charges.
            </p>
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="tracking-widest text-xs uppercase min-w-[220px]">
                List your property
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── RRA TIMELINE ─────────────────────────────────────── */}
      <section ref={timelineRef} className="py-32 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <p className="label-upper mb-6">Legislative Reality</p>
            <h2 className="font-serif text-5xl text-white leading-tight">
              The Renters Rights Act.<br />
              <span className="text-white/40">What changed and when.</span>
            </h2>
          </div>

          {/* Desktop: horizontal */}
          <div className="hidden md:block relative">
            <div className="absolute top-[5.5rem] left-0 right-0 h-[1px] bg-white/8" />
            <div className="grid grid-cols-5 gap-4">
              {RRA_EVENTS.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className="h-20 flex flex-col justify-end pb-4">
                    <p className="label-upper text-white/40">{ev.date}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-6 relative z-10" />
                  <h3 className="font-serif text-lg text-white mb-3 leading-snug">{ev.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed">{ev.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col gap-0 border-l border-white/10 pl-8">
            {RRA_EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pb-10"
              >
                <div className="absolute -left-[37px] top-0 w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />
                <p className="label-upper mb-3">{ev.date}</p>
                <h3 className="font-serif text-xl text-white mb-2">{ev.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{ev.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEE SECTION ──────────────────────────────────────── */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="label-upper mb-6">The Fee</p>
              <h2 className="font-serif text-5xl text-white mb-8">One formula. One fee.</h2>
              <p className="text-white/50 leading-relaxed text-lg mb-10 max-w-md">
                Traditional agents take a percentage forever. We find your tenant and step back. That's it.
              </p>
              <div className="font-serif text-2xl text-white/60 border-t border-white/10 pt-8">
                Monthly Rent × 12 ÷ 52 × 2
                <p className="text-[#C9A84C] text-lg mt-2">≈ Two weeks rent</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { rent: "£700/mo",   fee: "£323.07", desc: "Studio / room in shared house" },
                { rent: "£950/mo",   fee: "£438.46", desc: "Double room, Midlands" },
                { rent: "£1,300/mo", fee: "£600.00", desc: "Ensuite, South England" },
              ].map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex justify-between items-center p-8 bg-[#060606] border border-white/5 hover:border-[#C9A84C]/20 transition-colors"
                >
                  <div>
                    <p className="text-white/30 text-xs mb-1">{ex.desc}</p>
                    <p className="font-serif text-2xl text-white">{ex.rent}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-xs mb-1">One-time fee</p>
                    <p className="font-serif text-2xl text-[#C9A84C]">{ex.fee}</p>
                  </div>
                </motion.div>
              ))}
              <Link href="/pricing">
                <Button variant="outline" className="w-full mt-2 tracking-widest text-xs uppercase">
                  Use the fee calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6-POINT VERIFICATION ─────────────────────────────── */}
      <section ref={docsRef} className="py-32 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <p className="label-upper mb-6">Six-Point Verification</p>
            <h2 className="font-serif text-5xl text-white leading-tight">
              We don't just ask for a reference.<br />
              <span className="text-white/40">We build an irrefutable profile.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {DOCS.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={docsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <FlipCard doc={doc} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OBJECTIONS ───────────────────────────────────────── */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="label-upper mb-8">Common Objections</p>
          <h2 className="font-serif text-5xl text-white mb-16">Every question. Answered honestly.</h2>
          {OBJECTIONS.map((obj, i) => (
            <AccordionItem key={i} q={obj.q} a={obj.a} index={i} />
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Three fields. We'll take it from here.</h2>
          <p className="text-white/40 mb-12">Submit your property. Hear from us within four hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input type="text" placeholder="Your property postcode" className="bg-[#080808] border border-white/10 focus:border-[#C9A84C]/40 outline-none px-5 py-4 text-white text-sm placeholder:text-white/25 flex-1 transition-colors" />
            <input type="text" placeholder="Monthly rent (£)" className="bg-[#080808] border border-white/10 focus:border-[#C9A84C]/40 outline-none px-5 py-4 text-white text-sm placeholder:text-white/25 flex-1 transition-colors" />
            <Link href="/contact?type=landlord">
              <Button variant="gold" className="tracking-widest text-xs uppercase px-10 h-[56px]">
                Submit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
