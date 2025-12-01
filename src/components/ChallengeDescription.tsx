import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const ChallengeDescription = () => {
  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Challenge Description
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 bg-gradient-card backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="font-semibold text-primary">JUXTAMODE</span> is a platform for registering and remixing digital art as IP assets. This challenge asks you to either create original artwork or remix existing IP-protected pieces on their platform, then share your creations publicly.
                </p>
              </motion.div>

              <div className="border-t border-border/50 pt-6">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl font-semibold text-foreground mb-4"
                >
                  Requirements
                </motion.h3>
                <div className="space-y-3">
                  {[
                    "Minimum 4 pieces in your collection",
                    "Must be registered as a collection on JUXTAMODE",
                    "Video animation preferred, but still images accepted"
                  ].map((requirement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 hover-scale"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{requirement}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};