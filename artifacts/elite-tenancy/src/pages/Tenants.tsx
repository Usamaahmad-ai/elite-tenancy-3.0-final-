import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Check } from "lucide-react";

export default function Tenants() {
  const [isEliteModel, setIsEliteModel] = useState(false);
  const [activeTab, setActiveTab] = useState('Identity');
  const [expandedPersona, setExpandedPersona] = useState<number | null>(null);

  const tabs = ['Identity', 'Right to Rent', 'Bank Statements', 'Payslips', 'Employer Call', 'Landlord Reference'];

  const tabContent: Record<string, string[]> = {
    'Identity': ['Biometric facial match completed', 'Passport verified (MRZ scanned)', 'Address history confirmed', 'Photo ID cross-referenced'],
    'Right to Rent': ['Home Office check: Passed', 'Share code: Verified', 'Immigration status: Eligible to rent in UK'],
    'Bank Statements': ['3 months history via Open Banking', 'Regular salary deposits: Confirmed', 'Average monthly inflow: Verified', 'No undisclosed major debts found'],
    'Payslips': ['3 months documentation reviewed', 'Cross-referenced with banking: Matched', 'Employer details: Verified', 'Monthly net income: Confirmed'],
    'Employer Call': ['HR department: Called directly', 'Employment status: Permanent', 'Probation period: Complete', 'Notice period: 1 month'],
    'Landlord Reference': ['Previous landlord: Verified via Land Registry', 'Tenancy duration: 18 months confirmed', 'Arrears history: None', 'Overall Recommendation: Positive']
  };

  const personas = [
    { img: "portrait-nurse.png", type: "NHS Staff", city: "Manchester", short: "Needed rapid relocation without upfront agency fees taking a chunk of salary.", long: "Working 12-hour shifts meant standard agency viewing times were impossible. Elite Tenancy built her profile securely using Open Banking, matching her with a portfolio landlord who appreciated her stable income. She secured a premium 1-bed apartment near the hospital without taking a day off or paying any introduction fees." },
    { img: "portrait-pro.png", type: "International Worker", city: "Birmingham", short: "No UK credit history, but verifiable overseas income. We bridged the trust gap.", long: "Relocating from Dubai for a tech role, he had a high salary but zero UK credit footprint—an automatic rejection from traditional agencies. Our 6-point verification verified his international employer and overseas bank statements directly, translating his financial stability into a profile UK landlords trust. Secured before landing." },
    { img: "hero-tenant.png", type: "Postgraduate", city: "Bristol", short: "Guarantor verified seamlessly. Secured a premium room near university.", long: "Moving for a Master's degree, competing with hundreds of students for premium housing. Instead of a chaotic group viewing, she submitted her guarantor's details through our secure portal. The landlord received a fully vetted, risk-free profile and offered the tenancy immediately." },
    { img: "portrait-landlord.png", type: "Young Professional", city: "London", short: "Tired of ghost listings. Wanted access to serious landlords who respond.", long: "After spending £400 on holding deposits for flats that were 'already let', he switched to Elite. He built his profile once. When a Zone 2 flat matched his criteria, his pre-verified status meant the landlord chose him over 20 other applicants. Total fees paid: £0." }
  ];

  return (
    <div className="w-full pt-24 bg-background">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={`${import.meta.env.BASE_URL}images/hero-tenant.png`} alt="Tenant" className="w-full h-full object-cover opacity-30 ken-burns-img" />
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
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black shimmer-btn">Start Your Profile</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MONEY FLOW INFOGRAPHIC */}
      <section className="py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl text-white mb-16">The old way vs The Elite way</h2>
          
          <div className="relative bg-[#111] border border-white/10 p-12 rounded-sm mb-12 h-64 flex items-center justify-between">
            {/* Tenant Box */}
            <div className={`p-6 border-2 transition-all duration-500 z-10 bg-[#111] ${isEliteModel ? 'border-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'border-white/20'}`}>
              <span className="font-serif text-xl text-white">Tenant</span>
            </div>

            {/* Arrow Tenant -> Middle */}
            <div className="absolute left-[20%] right-[50%] h-[2px] overflow-hidden flex items-center">
              <motion.div 
                className={`w-full h-full ${isEliteModel ? 'bg-gradient-to-r from-green-500 to-primary' : 'bg-red-500'} bg-[length:200%_100%]`}
                animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -top-6 w-full text-center text-sm font-bold">
                {isEliteModel ? <span className="text-green-400">£0 (FREE)</span> : <span className="text-red-500">£££ (FEES)</span>}
              </div>
            </div>

            {/* Middle Box */}
            <div className="p-6 border border-white/20 z-10 bg-[#111]">
              <span className="font-serif text-xl text-white">
                {isEliteModel ? 'Elite Tenancy' : 'Traditional Agent'}
              </span>
            </div>

            {/* Arrow Middle <- Landlord */}
            <div className="absolute left-[50%] right-[20%] h-[2px] overflow-hidden flex items-center">
              <motion.div 
                className="w-full h-full bg-gradient-to-l from-primary to-transparent bg-[length:200%_100%]"
                animate={{ backgroundPosition: ["-100% 0", "100% 0"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -top-6 w-full text-center text-sm text-primary">
                {isEliteModel ? 'One Fixed Fee' : '£££ + % forever'}
              </div>
            </div>

            {/* Landlord Box */}
            <div className="p-6 border border-white/20 z-10 bg-[#111]">
              <span className="font-serif text-xl text-white">Landlord</span>
            </div>
          </div>

          <h3 className="text-2xl text-white font-serif mb-8">
            {isEliteModel ? 'Our model: You pay nothing. Ever.' : 'Traditional model: You pay to find a home.'}
          </h3>
          
          <Button 
            onClick={() => setIsEliteModel(!isEliteModel)} 
            variant={isEliteModel ? "outline" : "gold"} 
            className="shimmer-btn"
          >
            See the difference
          </Button>
        </div>
      </section>

      {/* INTERACTIVE PROFILE PACK */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-white mb-6">The Tenant Profile Pack</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Stop filling out the same forms for every viewing. We build a comprehensive, verified digital pack that landlords trust instantly. You hold the keys to your data.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-[#0a0a0a] border-t-4 border-primary shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#111]">
              <div className="font-serif text-2xl text-white">Elite<span className="text-primary">Tenancy</span></div>
              <div className="border border-primary text-primary px-4 py-1 text-sm tracking-widest uppercase rotate-[-5deg] font-bold">Verified</div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-6 border-b border-white/5 bg-[#050505]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeTab === tab 
                    ? 'bg-primary text-black font-medium' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-12 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-serif text-white border-b border-white/10 pb-4 mb-8">{activeTab} Verification</h3>
                  {tabContent[activeTab].map((item, i) => (
                    <div key={i} className="flex items-center text-lg text-white/80 bg-white/5 p-4 rounded-sm border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PERSONAS (UPGRADED) */}
      <section className="py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <h2 className="font-serif text-4xl text-white mb-16 text-center">Who uses Elite Tenancy?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personas.map((persona, i) => (
                <motion.div 
                  key={i} 
                  layout
                  onClick={() => setExpandedPersona(expandedPersona === i ? null : i)}
                  className="bg-card border border-white/10 hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden group min-h-[16rem]"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img src={`${import.meta.env.BASE_URL}images/${persona.img}`} alt={persona.type} className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <span className="text-primary text-xs uppercase tracking-widest block mb-2">{persona.city}</span>
                    <h3 className="text-white font-serif text-3xl mb-4">{persona.type}</h3>
                    
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {expandedPersona === i ? persona.long : persona.short}
                    </p>

                    <div className="mt-auto pt-4 flex items-center text-primary text-sm uppercase tracking-wider font-bold">
                      {expandedPersona === i ? 'Close story' : 'Read their story'}
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
