import { motion } from "framer-motion";

export default function Cities() {
  const cities = [
    { name: "London", rent: "£1,200", days: 9 },
    { name: "Manchester", rent: "£850", days: 11 },
    { name: "Birmingham", rent: "£750", days: 12 },
    { name: "Leeds", rent: "£700", days: 10 },
    { name: "Bristol", rent: "£900", days: 8 },
    { name: "Edinburgh", rent: "£850", days: 14 }
  ];

  return (
    <div className="w-full pt-24 bg-background">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={`${import.meta.env.BASE_URL}images/drone-city.png`} alt="City from above" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-white mb-6"
          >
            National scale. <br/>
            <span className="text-primary">Local precision.</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city, i) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 bg-card border border-white/5 overflow-hidden cursor-pointer"
              >
                {/* Fallback pattern since we don't have 12 generated images */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <h3 className="font-serif text-3xl text-white group-hover:text-primary transition-colors">{city.name}</h3>
                  
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="brand-line mb-4" />
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Avg Room</span>
                      <span className="text-white font-mono">{city.rent}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-white/50">Time to Fill</span>
                      <span className="text-white font-mono">{city.days} days</span>
                    </div>
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
