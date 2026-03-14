import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Resources() {
  const [track, setTrack] = useState<"landlord" | "tenant">("landlord");

  return (
    <div className="w-full pt-32 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-card p-1 rounded-sm border border-white/10 inline-flex">
            <button 
              className={`px-8 py-3 text-sm font-medium transition-colors ${track === "landlord" ? "bg-primary text-black" : "text-white/50 hover:text-white"}`}
              onClick={() => setTrack("landlord")}
            >
              Landlord Track
            </button>
            <button 
              className={`px-8 py-3 text-sm font-medium transition-colors ${track === "tenant" ? "bg-primary text-black" : "text-white/50 hover:text-white"}`}
              onClick={() => setTrack("tenant")}
            >
              Tenant Track
            </button>
          </div>
        </div>

        {/* Hero Article */}
        <div className="relative h-[500px] mb-16 bg-card border border-white/5 overflow-hidden group cursor-pointer">
          <img src={`${import.meta.env.BASE_URL}images/article-1.png`} alt="Featured" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 w-full max-w-3xl">
            <span className="text-primary text-xs uppercase tracking-widest mb-4 block">Featured Insight</span>
            <h2 className="font-serif text-4xl text-white mb-4">The Death of the Traditional Letting Agent</h2>
            <p className="text-xl text-primary font-serif italic mb-4">"The model of charging a percentage forever for a tenant placed once is structurally collapsing."</p>
            <span className="text-white/40 text-sm">8 minute read</span>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-32 border-t border-white/10 pt-20 pb-20 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Intel, not spam.</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Every two weeks. What's changed in UK property law. What it means for your asset or your tenancy. Nothing else.</p>
          <div className="flex max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="bg-card border border-white/10 px-6 py-3 text-white focus:outline-none focus:border-primary flex-1" />
            <Button variant="gold" className="rounded-none px-8">Subscribe</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
