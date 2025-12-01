import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Radio, Sparkles, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { IPRegistrationModal } from "./IPRegistrationModal";
import { BlockscoutStatsModal } from "./BlockscoutStatsModal";

const musicFeatures = [
  {
    icon: Music,
    title: "Remix Music Stems",
    description: "Transform individual music stems into viral short-form content. Register each remix as unique IP on-chain.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "On-Chain Mixing",
    description: "Mix and layer music tracks with blockchain-verified ownership and automatic royalty distribution.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Radio,
    title: "IP Consumption",
    description: "Create and register ringtones, samples, and audio snippets with immutable proof of ownership.",
    color: "from-green-500 to-emerald-500",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Instant IP Protection",
    description: "Every stem, remix, and creation is registered on Story Protocol in seconds.",
  },
  {
    icon: Zap,
    title: "Smart Royalties",
    description: "Automated royalty splits for collaborative music and derivative works.",
  },
  {
    icon: Sparkles,
    title: "TikTok Ready",
    description: "Export short-form content optimized for social platforms with IP rights intact.",
  },
];

export const MusicFeatures = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Music IP Innovation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            1. Web/Mobile apps optimized for easy IP Registration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamlined interface designed for seamless IP registration on Story Protocol.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {musicFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            1. Web/Mobile apps optimized for easy IP Registration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-foreground">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <IPRegistrationModal />
            <BlockscoutStatsModal />
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Powered by Story Protocol • Blockchain-Verified IP • Instant Registration
          </p>
        </motion.div>
      </div>
    </section>
  );
};
