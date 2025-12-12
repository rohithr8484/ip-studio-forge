import { Card } from "@/components/ui/card";
import { Zap, Lock, Globe, TrendingUp, Users, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Register IP on blockchain in under 5 seconds with optimized Story Protocol integration.",
  },
  {
    icon: Lock,
    title: "Immutable Proof",
    description: "Cryptographic proof of ownership that can't be altered or disputed.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "IP rights recognized across borders through decentralized blockchain infrastructure.",
  },
  {
    icon: TrendingUp,
    title: "Smart Royalties",
    description: "Automated royalty distribution with programmable licensing terms.",
  },
  {
    icon: Users,
    title: "Creator Economy",
    description: "Join a thriving ecosystem of AI creators and IP innovators.",
  },
  {
    icon: Cpu,
    title: "50+ AI Models",
    description: "Access diverse AI models for different content types and creative needs.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on Story Protocol for seamless IP management and AI integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex gap-4 items-start group p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 card-hover"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-neon"
                >
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-gradient transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};