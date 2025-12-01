import { Card } from "@/components/ui/card";
import { Video, Plane, Gamepad2 } from "lucide-react";
import { IPRegistrationModal } from "./IPRegistrationModal";
import { motion } from "framer-motion";
import povCityWalk from "@/assets/pov-city-walk.jpg";
import povClimbing from "@/assets/pov-climbing.jpg";
import povDriving from "@/assets/pov-driving.jpg";
import droneCitySunset from "@/assets/drone-city-sunset.jpg";
import droneFarmland from "@/assets/drone-farmland.jpg";
import droneBeach from "@/assets/drone-beach.jpg";
import xrDance from "@/assets/xr-dance.jpg";
import xrGestures from "@/assets/xr-gestures.jpg";
import xrFacial from "@/assets/xr-facial.jpg";

const contentTypes = [
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Urban street navigation",
    color: "text-primary",
    image: povCityWalk,
  },
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Indoor rock climbing",
    color: "text-primary",
    image: povClimbing,
  },
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Scenic road driving",
    color: "text-primary",
    image: povDriving,
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "City skyline mapping",
    color: "text-accent",
    image: droneCitySunset,
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "Agricultural monitoring",
    color: "text-accent",
    image: droneFarmland,
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "Coastal survey",
    color: "text-accent",
    image: droneBeach,
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Full-body dance tracking",
    color: "text-primary",
    image: xrDance,
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Gesture recognition",
    color: "text-primary",
    image: xrGestures,
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Facial expressions",
    color: "text-primary",
    image: xrFacial,
  },
];

export const AIContentTypes = () => {
  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Data - The Future of AI is Crowdsourced, Data isn't just quantity, it's quality, structure, and licensing.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powering next-generation AI with rights-cleared, on-chain registered content from real-world perspectives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contentTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="p-0 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={type.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {type.description}
                    </p>
                    <div className="text-sm text-accent/80 italic mb-6">
                      Example: {type.example}
                    </div>
                    <IPRegistrationModal defaultType={type.title} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20"
        >
          <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
            Why Rights-Cleared Content Matters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">🔒</div>
              <div className="text-sm text-muted-foreground">Blockchain-verified ownership and licensing</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-accent mb-2">⚡</div>
              <div className="text-sm text-muted-foreground">Instant royalty distribution to creators</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">🌐</div>
              <div className="text-sm text-muted-foreground">Global marketplace for AI training data</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};