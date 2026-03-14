import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/landlords", label: "For Landlords" },
    { href: "/tenants", label: "For Tenants" },
    { href: "/pricing", label: "Pricing" },
    { href: "/renters-rights-act", label: "Renters Rights Act" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/0 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide flex flex-col group">
            <span className="text-white group-hover:text-primary transition-colors duration-300">Elite</span>
            <span className="text-primary -mt-1 text-lg group-hover:text-white transition-colors duration-300">Tenancy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                  location === link.href ? "text-primary" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact?type=tenant">
              <Button variant="outline" className="text-xs tracking-widest uppercase">Find a Room</Button>
            </Link>
            <Link href="/contact?type=landlord">
              <Button variant="gold" className="text-xs tracking-widest uppercase">List a Room</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-2xl font-serif">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={location === link.href ? "text-primary" : "text-white/80"}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px w-full bg-white/10 my-4" />
              <Link href="/contact?type=landlord" className="text-primary">List a Room</Link>
              <Link href="/contact?type=tenant" className="text-primary">Find a Room</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-black border-t border-white/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/" className="font-serif text-3xl tracking-wide mb-6 block">
                <span className="text-white">Elite</span>
                <span className="text-primary block -mt-2">Tenancy</span>
              </Link>
              <p className="text-white/50 text-sm mt-6 pr-4">
                Two different problems. One company built to solve both. The UK's only zero-fee tenant introduction service.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6 text-white">Services</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><Link href="/landlords" className="hover:text-primary transition-colors">For Landlords</Link></li>
                <li><Link href="/tenants" className="hover:text-primary transition-colors">For Tenants</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Transparent Pricing</Link></li>
                <li><Link href="/cities" className="hover:text-primary transition-colors">Areas We Cover</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6 text-white">Knowledge</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><Link href="/renters-rights-act" className="hover:text-primary transition-colors">Renters Rights Act Guide</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="/why-us" className="hover:text-primary transition-colors">Why Elite Tenancy</Link></li>
                <li><Link href="/resources" className="hover:text-primary transition-colors">Resources & Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6 text-white">Legal & Compliance</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><Link href="/compliance" className="hover:text-primary transition-colors">Compliance Record</Link></li>
                <li><span className="text-white/30">UKALA:</span> #108492</li>
                <li><span className="text-white/30">PRS:</span> #PRS10492</li>
                <li><span className="text-white/30">ICO:</span> #ZA849302</li>
              </ul>
            </div>
          </div>

          <div className="brand-line mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
            <p>© {new Date().getFullYear()} Elite Tenancy Ltd. All rights reserved. Registered in England & Wales.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
