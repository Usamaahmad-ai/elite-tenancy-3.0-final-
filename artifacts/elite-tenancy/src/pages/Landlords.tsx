import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Landlords() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const timelineEvents = [
    { date: "Jun 2023", title: "Renters Reform Bill introduced" },
    { date: "May 2024", title: "Bill passes — Section 21 abolition confirmed" },
    { date: "Jan 2025", title: "Royal Assent granted" },
    { date: "Apr 2025", title: "Phase 1: New tenancies under new rules" },
    { date: "Oct 2025", title: "Phase 2: ALL tenancies — Section 21 formally abolished" }
  ];

  const objections = [
    { q: "Why should I trust a digital system over a local agent?", a: "Local agents rely on manual PDF checks and phone calls. We use biometric facial recognition, Open Banking APIs, and direct Home Office integration. Our system catches synthetic identities and fraudulent documents that human eyes miss." },
    { q: "What if the tenant stops paying rent?", a: "Because we verified their actual income deposits via Open Banking (not just a PDF payslip), the risk is mathematically lower. However, we always recommend rent guarantee insurance for absolute protection." },
    { q: "Do you handle property maintenance?", a: "No. We believe management and tenant-finding are completely different skill sets. We are experts at finding and verifying. Once they move in, you manage the property without paying an agent 10% every month forever." },
    { q: "How can you fill a room in 14 days?", a: "Because we don't charge tenants fees, we have a massive pool of pre-verified, high-quality tenants waiting for rooms. The moment you list, we match your property with ready-to-move profiles." },
    { q: "What happens if the tenant fails referencing?", a: "We don't bring you unverified tenants. You only see profiles of people who have already passed our rigorous 6-point check." },
    { q: "Is the fee really just two weeks rent?", a: "Yes. Monthly Rent × 12 ÷ 52 × 2. No hidden VAT add-ons, no admin fees, no renewal fees. Ever." }
  ];

  return (
    <div className="w-full pt-24 bg-background">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={`${import.meta.env.BASE_URL}images/hero-landlord.png`} alt="Empty room" className="w-full h-full object-cover opacity-30 ken-burns-img" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="w-16 h-[1px] bg-primary mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8">
              Every day this room is empty costs you money. <br/>
              <span className="text-primary">Every wrong tenant costs you much more.</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
              We charge one flat fee to fill your property with a strictly verified tenant in 14 days. No hidden management charges. No renewal fees.
            </p>
            <Link href="/contact?type=landlord">
              <Button variant="gold" size="lg" className="shimmer-btn">List Your Property</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* RRA TIMELINE */}
      <section className="py-32 bg-[#030303] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">The Legislative Reality</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">The Renters Rights Act changed everything. Section 21 is gone. Here is what changed and when.</p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative mt-32 mb-20">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 -translate-y-1/2" />
            <div className="flex justify-between relative z-10 w-full">
              {timelineEvents.map((ev, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`flex flex-col items-center w-48 ${i % 2 === 0 ? '-mt-24' : 'mt-12'}`}
                >
                  {i % 2 === 0 ? (
                    <>
                      <span className="text-primary font-serif mb-4 text-xl">{ev.date}</span>
                      <div className="w-4 h-4 rounded-full bg-black border-2 border-primary mb-4 relative z-10 gold-glow-pulse" />
                      <p className="text-white/60 text-sm text-center">{ev.title}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-white/60 text-sm text-center mb-4">{ev.title}</p>
                      <div className="w-4 h-4 rounded-full bg-black border-2 border-primary mt-4 mb-4 relative z-10 gold-glow-pulse" />
                      <span className="text-primary font-serif text-xl">{ev.date}</span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Accordion/List for Timeline */}
          <div className="md:hidden space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-primary/20 z-10">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded bg-[#111] border border-white/5">
                  <div className="text-primary font-serif mb-1">{ev.date}</div>
                  <div className="text-white/70 text-sm">{ev.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEE SECTION */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-primary text-sm uppercase tracking-widest mb-4">Complete Transparency</h2>
              <h3 className="font-serif text-4xl text-white mb-8">One formula. One fee.</h3>
              <p className="text-white/60 mb-12 leading-relaxed text-lg">
                Traditional agents take a percentage forever, plus hidden markups on maintenance. We don't manage your property; we just find the perfect tenant and step away.
              </p>
              
              <div className="bg-card border border-white/10 p-8 rounded-sm">
                <div className="text-center pb-8 mb-8 border-b border-white/10">
                  <span className="text-white/40 text-sm uppercase tracking-widest block mb-4">The Calculation</span>
                  <div className="font-serif text-3xl text-white">Monthly Rent × 12 ÷ 52 × 2</div>
                  <p className="text-primary mt-2">Approximately two weeks rent.</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { rent: "£700", fee: "£323.07" },
                    { rent: "£950", fee: "£438.46" },
                    { rent: "£1,300", fee: "£600.00" }
                  ].map((ex) => (
                    <div key={ex.rent} className="flex justify-between items-center text-lg">
                      <span className="text-white/60">If rent is {ex.rent}/mo</span>
                      <span className="text-white font-serif">Fee: <span className="text-primary">{ex.fee}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Visual Comparison */}
            <div className="h-full flex flex-col justify-end gap-8 pl-0 lg:pl-12">
              <div className="flex items-end gap-8 h-64 border-b border-white/20 pb-4">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-1/2 bg-white/10 relative group"
                >
                  <div className="absolute -top-10 left-0 right-0 text-center text-white/50 text-sm">Traditional Agent</div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif rotate-[-90deg] whitespace-nowrap text-2xl tracking-widest">Fees + Renewal + Hidden</div>
                </motion.div>
                
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "25%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="w-1/2 bg-primary relative shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  <div className="absolute -top-10 left-0 right-0 text-center text-primary font-bold">Elite Tenancy</div>
                  <div className="absolute inset-0 flex items-center justify-center text-black font-serif font-medium">One Fee</div>
                </motion.div>
              </div>
              <p className="text-white/40 text-sm text-center italic">Visual representation of first-year costs on a £1,000/mo property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6-POINT VERIFICATION CARDS */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl text-white mb-6">The 6-Point Verification</h2>
            <p className="text-white/60 text-lg">We don't just ask for a reference. We build an irrefutable profile. Every tenant must pass these six gates before you ever see their name.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Identity", desc: "Biometric facial match against government ID. Stops synthetic identities." },
              { title: "Right to Rent", desc: "Direct Home Office integration. Ensures legal compliance." },
              { title: "Bank Statements", desc: "Open Banking connection. We don't accept PDFs that can be photoshopped." },
              { title: "Payslips", desc: "Cross-referenced with banking data to ensure salary is actively deposited." },
              { title: "Employer Call", desc: "We don't email. We call the registered HR department to confirm employment." },
              { title: "Landlord Reference", desc: "We verify the landlord actually owns the property via Land Registry." }
            ].map((doc, i) => (
              <div key={i} className="group perspective h-64">
                <div className="relative preserve-3d w-full h-full duration-700 group-hover:my-rotate-y-180">
                  {/* Front */}
                  <div className="absolute backface-hidden w-full h-full bg-card border border-white/5 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] group-hover:border-primary/50 transition-all duration-300 p-8 flex flex-col justify-center items-center text-center overflow-hidden">
                    <div className="absolute bottom-2 right-4 text-8xl font-serif text-white/[0.03] select-none pointer-events-none">0{i+1}</div>
                    <div className="text-primary text-4xl font-serif mb-4 relative z-10">0{i+1}</div>
                    <h3 className="text-white text-xl relative z-10">{doc.title}</h3>
                    <div className="mt-6 text-white/30 flex items-center text-sm uppercase tracking-wider relative z-10">
                      Hover to reveal <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-primary p-8 flex flex-col justify-center text-black">
                    <h4 className="font-bold mb-2 uppercase tracking-wide text-sm">The Fraud it Prevents</h4>
                    <p className="font-serif text-lg leading-snug">{doc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIONS ACCORDION */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="font-serif text-4xl text-white mb-16 text-center">Every question. Answered honestly.</h2>
           <div className="space-y-4">
             {objections.map((obj, idx) => (
               <div key={idx} className="bg-card border border-white/5 overflow-hidden">
                 <button 
                   className="w-full px-6 py-6 flex justify-between items-center text-left"
                   onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                 >
                   <span className="font-serif text-xl text-white font-bold">{obj.q}</span>
                   <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                 </button>
                 <AnimatePresence>
                   {openIndex === idx && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.3 }}
                     >
                       <div className="px-6 pb-6 text-white/70 leading-relaxed pl-6 border-l border-primary/30 ml-6 mb-6 text-lg gold-tinted">
                         {obj.a}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* QUICK FORM CTA */}
      <section className="py-32 bg-[#020202] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Three fields. We'll take it from here.</h2>
          <p className="text-white/50 mb-12">Submit basic details, and our verification team will contact you within 2 hours.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Postcode" 
              className="bg-card border border-white/10 text-white px-6 py-4 outline-none focus:border-primary flex-1"
            />
            <input 
              type="text" 
              placeholder="Monthly Rent" 
              className="bg-card border border-white/10 text-white px-6 py-4 outline-none focus:border-primary flex-1"
            />
            <Button variant="gold" size="lg" className="px-10 h-[58px] shimmer-btn">Submit</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
