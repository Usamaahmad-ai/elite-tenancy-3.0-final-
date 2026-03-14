import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSubmitProperty, useSubmitTenantNeeds } from "@/hooks/use-forms";

export default function Contact() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialType = searchParams.get("type") as "landlord" | "tenant" | null;
  
  const [activeForm, setActiveForm] = useState<"landlord" | "tenant" | null>(initialType);

  const { mutate: submitProperty, isPending: isLandlordPending } = useSubmitProperty();
  const { mutate: submitTenant, isPending: isTenantPending } = useSubmitTenantNeeds();

  // Cycling text
  const questions = ["Have a room to fill?", "Looking for a room?", "Not sure where to start?"];
  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    if (activeForm) return; // Stop cycling if a form is selected
    const interval = setInterval(() => {
      setQIndex((prev) => (prev + 1) % questions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeForm]);

  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {!activeForm ? (
          <div className="text-center mt-20">
            <AnimatePresence mode="wait">
              <motion.h1
                key={qIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-4xl md:text-6xl text-white mb-12 h-20"
              >
                {questions[qIndex]}
              </motion.h1>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
               <Button variant="gold" size="lg" onClick={() => setActiveForm("landlord")} className="w-full sm:w-64">I'm a Landlord</Button>
               <Button variant="outline" size="lg" onClick={() => setActiveForm("tenant")} className="w-full sm:w-64 text-white border-white/20">I'm a Tenant</Button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-white/10 p-8 md:p-12 shadow-2xl shadow-black"
          >
            <button 
              onClick={() => setActiveForm(null)}
              className="text-white/40 text-sm hover:text-white mb-8 transition-colors"
            >
              ← Back
            </button>

            {activeForm === "landlord" ? (
              <div>
                <h2 className="font-serif text-3xl text-white mb-2">Submit Property</h2>
                <p className="text-white/50 mb-8">Three fields. We'll handle the rest.</p>
                <form 
                  onSubmit={(e) => { e.preventDefault(); submitProperty({}); }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Property Postcode</label>
                    <input required type="text" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. M1 4BT" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Monthly Rent</label>
                    <input required type="number" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="£" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Available From</label>
                    <input required type="date" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" />
                  </div>
                  <Button variant="gold" className="w-full h-14 mt-4" disabled={isLandlordPending}>
                    {isLandlordPending ? "Submitting..." : "Submit Property"}
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="font-serif text-3xl text-white mb-2">Start Profile</h2>
                <p className="text-white/50 mb-8">Tell us what you need. Zero fees.</p>
                <form 
                  onSubmit={(e) => { e.preventDefault(); submitTenant({}); }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Target City</label>
                    <input required type="text" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. London" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Monthly Budget</label>
                    <input required type="number" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="£ Max" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Move-in Date</label>
                    <input required type="date" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary outline-none transition-colors" />
                  </div>
                  <Button variant="gold" className="w-full h-14 mt-4" disabled={isTenantPending}>
                    {isTenantPending ? "Initializing..." : "Create Free Profile"}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
