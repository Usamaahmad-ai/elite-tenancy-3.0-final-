import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <div className="w-full pt-32 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-24 relative">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-[45%] text-right pr-8"
          >
            <h1 className="font-serif text-4xl text-white tracking-widest uppercase">Landlord</h1>
          </motion.div>
          
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className="w-px h-32 bg-primary origin-top"
          />
          
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-[45%] pl-8"
          >
            <h1 className="font-serif text-4xl text-white tracking-widest uppercase">Tenant</h1>
          </motion.div>
        </div>

        {/* Timeline representation */}
        <div className="relative py-20 border-t border-white/10">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          {[
            { l: "Submit Property Details", t: "Create Free Profile", icon: "01" },
            { l: "System values & lists room", t: "System matches requirements", icon: "02" },
            { l: "Receive verified tenant packs", t: "Receive property invites", icon: "03", intersect: true },
            { l: "Accept best match", t: "Confirm viewing/interest", icon: "04" },
            { l: "Move-in day (Fee paid)", t: "Move-in day (£0 fees)", icon: "05" }
          ].map((step, i) => (
            <div key={i} className="flex justify-between items-center mb-24 relative w-full">
              <div className="w-[45%] text-right pr-12">
                <p className="text-white/60 text-lg">{step.l}</p>
              </div>
              
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-primary text-primary font-serif z-10 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                {step.icon}
              </div>
              
              <div className="w-[45%] pl-12">
                <p className="text-white/60 text-lg">{step.t}</p>
              </div>

              {step.intersect && (
                <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-primary/30 z-0 border-t border-dashed border-primary" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
