import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";

import { AIContentTypes } from "@/components/AIContentTypes";

import { MusicFeatures } from "@/components/MusicFeatures";
import { MusicConsumptionBanners } from "@/components/MusicConsumptionBanners";
import { ChatBot } from "@/components/ChatBot";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AIContentTypes />
      <div id="music">
        <MusicFeatures />
      </div>
      <MusicConsumptionBanners />
      <ChatBot />
      <CTA />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary hover-scale"></div>
              <span className="text-xl font-bold text-foreground">Surra</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              AI-powered IP creation and protection built on Story Protocol.
            </p>
            <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
              <p>© 2025 Surra. Built with Story Protocol SDK. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;