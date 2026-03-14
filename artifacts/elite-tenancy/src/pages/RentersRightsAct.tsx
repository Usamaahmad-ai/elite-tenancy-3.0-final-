import { motion, useScroll, useSpring } from "framer-motion";

export default function RentersRightsAct() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="w-full pt-32 bg-background min-h-screen relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-[88px] left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-32">
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">The Renters Rights Act 2025</h1>
        <p className="text-xl text-primary font-serif italic mb-16">The Definitive Guide for Landlords & Tenants</p>

        <div className="space-y-16 text-white/70 leading-relaxed text-lg">
          <section>
            <h2 className="font-serif text-3xl text-white mb-6">Section 21 is Abolished</h2>
            <p className="mb-4">The removal of "no-fault" evictions represents the largest shift in the UK rental market in thirty years. Landlords can no longer ask tenants to leave without a valid, legally proven reason.</p>
            <div className="bg-card border-l-4 border-primary p-6 my-8">
              <h3 className="text-white font-bold mb-2">What this means:</h3>
              <p>Your upfront tenant vetting is now your only shield. If you accept a bad tenant, removing them will require court proceedings, taking an average of 7-9 months.</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-white mb-6">The New Elite Tenancy Standard</h2>
            <p>Because the risk to landlords has multiplied, our verification standard has deepened. Our 6-point verification process was built specifically to counter the risks introduced by the Renters Rights Act.</p>
          </section>

          {/* Myth Busting Section */}
          <section className="mt-24">
            <h2 className="font-serif text-3xl text-white mb-10 text-center">Myths vs Reality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-8 border border-white/10 hover:border-primary/50 transition-colors">
                <p className="italic text-white/50 mb-4">"I can still easily evict if they stop paying rent."</p>
                <p className="text-white font-medium text-lg">Reality: Yes, under Section 8, but court backlogs mean it takes months. Upfront financial verification (like our Open Banking check) is crucial.</p>
              </div>
              <div className="bg-card p-8 border border-white/10 hover:border-primary/50 transition-colors">
                <p className="italic text-white/50 mb-4">"Tenants have all the power now."</p>
                <p className="text-white font-medium text-lg">Reality: Good tenants are protected. But landlords retain strong grounds to reclaim property if they wish to sell or move in.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
