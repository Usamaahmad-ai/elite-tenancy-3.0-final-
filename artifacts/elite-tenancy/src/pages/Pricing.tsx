import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Pricing() {
  const [rent, setRent] = useState<number>(1000);
  const [showResults, setShowResults] = useState(false);
  const [barAnimated, setBarAnimated] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const calculateFee = (monthlyRent: number) => {
    return ((monthlyRent * 12) / 52) * 2;
  };

  const handleInteraction = (val: number) => {
    setRent(val);
    setShowResults(true);
  };

  const fee = calculateFee(rent);
  const traditionalFee = rent * 12 * 0.10;
  const savings = traditionalFee - fee;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "When do I pay?", a: "Only when a verified tenant signs the tenancy agreement and pays their first month's rent. No upfront costs." },
    { q: "Are there any hidden charges?", a: "No. The fee you see calculated here is the absolute final amount. No VAT add-ons, no renewal fees, no admin costs." },
    { q: "What if the tenant leaves early?", a: "We offer a 14-day guarantee. If the tenant fails within the first 14 days, we replace them completely free of charge." },
    { q: "Can I negotiate the fee?", a: "No. We operate a fixed, transparent formula for every landlord in the UK to ensure fairness and maintain our high standards of verification." },
    { q: "How is the payment collected?", a: "We deduct our one-off fee from the first month's rent collected from the tenant before passing the balance to you." },
    { q: "Is VAT included?", a: "Yes, all our calculations include VAT where applicable. What you see is what you pay." }
  ];

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
          <div className="bg-card border border-white/10 p-12 text-center flex flex-col justify-center gold-glow-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
            <h2 className="text-white/50 uppercase tracking-widest text-sm mb-8 relative z-10">For Tenants</h2>
            <div className="font-serif text-8xl md:text-[120px] text-primary mb-4 leading-none relative z-10">£0</div>
            <p className="text-white/80 text-xl font-serif relative z-10">Always. Forever. By law.</p>
          </div>
          
          <div className="bg-card border border-white/10 p-12 text-center flex flex-col justify-center">
            <h2 className="text-white/50 uppercase tracking-widest text-sm mb-8">For Landlords</h2>
            <div className="font-serif text-4xl md:text-5xl text-white mb-6 leading-relaxed">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Rent × 12</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/30">÷ 52</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-primary">× 2</motion.div>
            </div>
            <p className="text-white/80 text-xl font-serif">Two weeks rent. That's it.</p>
          </div>
        </div>

        {/* CALCULATOR */}
        <div 
          className="max-w-4xl mx-auto p-8 md:p-16 relative overflow-hidden mb-32"
          style={{
            background: 'linear-gradient(#111,#111) padding-box, linear-gradient(45deg, #C9A84C, #8B6914) border-box',
            border: '1px solid transparent'
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-12 text-center">Calculate Your Exact Fee</h3>
          
          <div className="flex flex-col items-center mb-12">
            <label className="text-white/50 mb-4 uppercase tracking-widest text-sm">Monthly Rent</label>
            <div className="flex items-center text-5xl md:text-7xl font-serif text-white mb-8 border-b border-white/20 pb-2">
              <span className="text-primary mr-2">£</span>
              <input 
                type="number" 
                min="400" 
                max="10000" 
                value={rent}
                onChange={(e) => handleInteraction(Number(e.target.value))}
                className="bg-transparent border-none outline-none w-[200px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <input 
              type="range" 
              min="400" 
              max="5000" 
              step="50"
              value={rent}
              onChange={(e) => handleInteraction(Number(e.target.value))}
              className="w-full max-w-md gold-slider"
            />
          </div>

          <div className="brand-line mb-12" />

          {/* FORMULA BREAKDOWN */}
          <div className="max-w-2xl mx-auto space-y-4 mb-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showResults ? 1 : 0.5 }} transition={{ delay: 0.1 }} className="flex justify-between text-lg">
               <span className="text-white/60">Monthly rent</span>
               <span className="text-white">£{rent.toLocaleString()}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showResults ? 1 : 0.5 }} transition={{ delay: 0.2 }} className="flex justify-between text-lg">
               <span className="text-white/60">Annual (× 12)</span>
               <span className="text-white">£{(rent * 12).toLocaleString()}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showResults ? 1 : 0.5 }} transition={{ delay: 0.3 }} className="flex justify-between text-lg">
               <span className="text-white/60">Weekly (÷ 52)</span>
               <span className="text-white">£{(rent * 12 / 52).toFixed(2)}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showResults ? 1 : 0.5 }} transition={{ delay: 0.4 }} className="flex justify-between text-2xl md:text-3xl font-serif mt-6 pt-6 border-t border-white/10 gold-glow-pulse">
               <span className="text-primary">Your fee (× 2)</span>
               <span className="text-primary text-glow">£{fee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </motion.div>
            <p className="text-center text-white/40 text-sm mt-6 pt-4">One-time. On successful placement only. No hidden charges.</p>
          </div>

          {/* COMPARISON BARS */}
          <div ref={barRef} className="max-w-xl mx-auto mb-12">
            <h4 className="text-center text-white/50 text-sm uppercase tracking-widest mb-8">Compared to 10% Traditional Agent</h4>
            <div className="flex justify-center items-end gap-12 h-[200px] border-b border-white/20 pb-4">
              <div className="flex flex-col items-center w-32">
                <span className="text-white mb-2 font-serif text-xl">£{traditionalFee.toFixed(0)}</span>
                <motion.div 
                  className="w-full bg-white/10"
                  initial={{ height: 0 }}
                  animate={{ height: barAnimated ? "100%" : 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <span className="text-white/40 text-xs mt-4 uppercase">Traditional</span>
              </div>
              <div className="flex flex-col items-center w-32">
                <span className="text-primary mb-2 font-serif text-xl">£{fee.toFixed(0)}</span>
                <motion.div 
                  className="w-full bg-primary shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  initial={{ height: 0 }}
                  animate={{ height: barAnimated ? `${(fee / traditionalFee) * 100}%` : 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
                <span className="text-primary text-xs mt-4 uppercase">Elite</span>
              </div>
            </div>
            <p className="text-center text-white/80 font-serif text-lg mt-6">
              You save <span className="text-primary">£{savings.toFixed(2)}</span> in year one alone.
            </p>
          </div>
          
          <div className="mt-12 text-center">
             <Button variant="gold" size="lg" className="px-12 shimmer-btn">Proceed with £{fee.toLocaleString(undefined, {maximumFractionDigits:0})} Fee</Button>
          </div>
        </div>

        {/* WORKED EXAMPLES */}
        <div className="mb-32">
          <h3 className="font-serif text-3xl text-white mb-8 text-center">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[700, 950, 1300].map((exRent) => (
               <div 
                 key={exRent} 
                 onClick={() => handleInteraction(exRent)}
                 className="bg-card border border-white/10 p-6 cursor-pointer hover:border-primary/50 transition-colors text-center group"
               >
                  <p className="text-white/50 text-sm mb-2">Rent £{exRent}</p>
                  <p className="font-serif text-2xl text-white mb-4">Fee: £{calculateFee(exRent).toFixed(2)}</p>
                  <span className="text-primary text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Click to calculate</span>
               </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-3xl text-white mb-12 text-center">Financial FAQs</h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
               <div key={idx} className="bg-[#111] border border-white/5 overflow-hidden">
                 <button 
                   className="w-full px-6 py-6 flex justify-between items-center text-left"
                   onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                 >
                   <span className="font-serif text-xl text-white">{faq.q}</span>
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
                       <div className="px-6 pb-6 text-white/60 leading-relaxed pl-6 border-l-2 border-primary/30 ml-6 mb-6">
                         {faq.a}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
