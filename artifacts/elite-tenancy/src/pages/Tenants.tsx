import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Tenants() {
  return (
    <div className="w-full pt-24 bg-background">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={`${import.meta.env.BASE_URL}images/hero-tenant.png`} alt="Tenant" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-right"
          >
            <div className="w-16 h-[1px] bg-primary mb-8 ml-auto" />
            <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-8">
              The rental market charges you to find a home. <br/>
              <span className="text-primary">We think that's wrong.</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed ml-auto">
              Create your verified profile once. Get matched with premium landlords across the UK. Pay absolutely nothing to us, ever.
            </p>
            <Link href="/contact?type=tenant">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black">Start Your Profile</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE PROFILE PACK */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-white mb-6">The Tenant Profile Pack</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Stop filling out the same forms for every viewing. We build a comprehensive, verified digital pack that landlords trust instantly. You hold the keys to your data.</p>
          </div>

          <div className="relative">
            <img src={`${import.meta.env.BASE_URL}images/profile-pack.png`} alt="Profile Pack" className="w-full h-[600px] object-cover opacity-40 rounded-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 p-6 w-full max-w-4xl">
                {['Identity Verified', 'Right to Rent Cleared', 'Income Confirmed', 'References Checked', 'Credit Screened', 'Ready to Move'].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/60 backdrop-blur-md border border-primary/30 p-6 rounded-sm text-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary mx-auto mb-4 animate-pulse" />
                    <h3 className="text-white font-serif">{item}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="py-32 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <h2 className="font-serif text-3xl text-white mb-16 text-center">Who uses Elite Tenancy?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: "NHS Staff", city: "Manchester", desc: "Needed rapid relocation without upfront agency fees taking a chunk of salary." },
                { type: "International Worker", city: "Birmingham", desc: "No UK credit history, but verifiable overseas income. We bridged the trust gap." },
                { type: "Postgraduate", city: "Bristol", desc: "Guarantor verified seamlessly. Secured a premium room near university." },
                { type: "Young Professional", city: "London", desc: "Tired of ghost listings. Wanted access to serious landlords who respond." }
              ].map((persona, i) => (
                <div key={i} className="bg-card p-8 border border-white/5 hover:border-primary/50 transition-colors">
                  <span className="text-primary text-xs uppercase tracking-widest block mb-2">{persona.city}</span>
                  <h3 className="text-white font-serif text-xl mb-4">{persona.type}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{persona.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
