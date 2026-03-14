import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [rent, setRent] = useState<number>(1000);
  
  const calculateFee = (monthlyRent: number) => {
    return ((monthlyRent * 12) / 52) * 2;
  };

  const fee = calculateFee(rent);

  return (
    <div className="w-full pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Complete Transparency.</h1>
          <p className="text-white/50 text-xl">The property industry hides behind percentages. We use absolute numbers.</p>
        </div>

        {/* GIANT NUMBERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="bg-card border border-white/10 p-12 text-center flex flex-col justify-center">
            <h2 className="text-white/50 uppercase tracking-widest text-sm mb-8">For Tenants</h2>
            <div className="font-serif text-8xl md:text-[120px] text-primary mb-4 leading-none">£0</div>
            <p className="text-white/80 text-xl font-serif">Always. Forever. By law.</p>
          </div>
          
          <div className="bg-card border border-white/10 p-12 text-center flex flex-col justify-center">
            <h2 className="text-white/50 uppercase tracking-widest text-sm mb-8">For Landlords</h2>
            <div className="font-serif text-4xl md:text-5xl text-white mb-6 leading-relaxed">
              Rent × 12 <br/>
              <span className="text-white/30">÷ 52</span> <br/>
              × 2
            </div>
            <p className="text-primary text-xl font-serif">Two weeks rent. That's it.</p>
          </div>
        </div>

        {/* INTERACTIVE CALCULATOR */}
        <div className="max-w-4xl mx-auto bg-[#050505] border border-primary/20 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          
          <h3 className="font-serif text-3xl text-white mb-8 text-center">Calculate Your Exact Fee</h3>
          
          <div className="flex flex-col items-center mb-12">
            <label className="text-white/50 mb-4 uppercase tracking-widest text-sm">Monthly Rent (£)</label>
            <input 
              type="range" 
              min="400" 
              max="5000" 
              step="50"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full max-w-md accent-primary"
            />
            <div className="text-3xl text-white mt-4 font-serif">£{rent.toLocaleString()}</div>
          </div>

          <div className="brand-line mb-12" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-white/40 text-sm mb-2">The Formula</p>
              <p className="text-white font-mono bg-white/5 px-4 py-2 rounded-sm border border-white/10">
                (£{rent} × 12) ÷ 52 × 2
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm mb-2">Your One-Time Placement Fee</p>
              <p className="font-serif text-5xl text-primary text-glow">
                £{fee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <Button variant="gold" size="lg" className="px-12">Proceed with £{fee.toLocaleString(undefined, {maximumFractionDigits:0})} Fee</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
