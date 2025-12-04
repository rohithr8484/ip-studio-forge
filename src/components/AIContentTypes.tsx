import { Card } from "@/components/ui/card";
import { Video, Plane, Gamepad2, Play, Pause } from "lucide-react";
import { IPRegistrationModal } from "./IPRegistrationModal";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import povUrban from "@/assets/pov-urban.jpg";
import povClimbing from "@/assets/pov-climbing.jpg";
import povDriving from "@/assets/pov-driving-new.jpg";
import droneCity from "@/assets/drone-city.jpg";
import droneFarm from "@/assets/drone-farm.jpg";
import droneCoast from "@/assets/drone-coast.jpg";
import xrDance from "@/assets/xr-dance-new.jpg";
import xrGesture from "@/assets/xr-gesture.jpg";
import xrFacial from "@/assets/xr-facial.jpg";

// Video player component
const VideoPlayer = ({ 
  videoSrc, 
  posterImage, 
  title 
}: { 
  videoSrc?: string; 
  posterImage: string; 
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative h-48 w-full overflow-hidden group/video">
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterImage}
          className="w-full h-full object-cover"
          onEnded={handleEnded}
          muted
          loop
          playsInline
        />
      ) : (
        <img 
          src={posterImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
        <button 
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          )}
        </button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
      {/* Video duration badge */}
      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-xs text-white">
        {videoSrc ? "10-30s" : "Sample"}
      </div>
    </div>
  );
};

const contentTypes = [
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Urban street navigation",
    color: "text-primary",
    image: povUrban,
    video: "/videos/pov-urban.mp4",
  },
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Indoor rock climbing",
    color: "text-primary",
    image: povClimbing,
    video: undefined, // Add your video file
  },
  {
    icon: Video,
    title: "PoV Videos",
    description: "First-person perspective footage powering immersive AI training datasets for spatial understanding and human interaction.",
    example: "Scenic road driving",
    color: "text-primary",
    image: povDriving,
    video: undefined, // Add your video file
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "City skyline mapping",
    color: "text-accent",
    image: droneCity,
    video: "/videos/drone-city.mp4",
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "Agricultural monitoring",
    color: "text-accent",
    image: droneFarm,
    video: undefined, // Add your video file
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Aerial perspectives providing unique vantage points for AI models learning spatial reasoning and environmental mapping.",
    example: "Coastal survey",
    color: "text-accent",
    image: droneCoast,
    video: undefined, // Add your video file
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Full-body dance tracking",
    color: "text-primary",
    image: xrDance,
    video: undefined, // Add your video file
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Gesture recognition",
    color: "text-primary",
    image: xrGesture,
    video: undefined, // Add your video file
  },
  {
    icon: Gamepad2,
    title: "XR Motion Capture",
    description: "Extended reality data capturing human movement and interactions for next-generation AI understanding of physical behavior.",
    example: "Facial expressions",
    color: "text-primary",
    image: xrFacial,
    video: undefined, // Add your video file
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
            Register Your Data as IP on Story Protocol
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            PoV videos, drone footage, motion captures from XR, and other data samples — all rights-cleared and registered as IP for AI training
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
                  className="p-0 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group overflow-hidden"
                >
                  <VideoPlayer
                    videoSrc={type.video}
                    posterImage={type.image}
                    title={type.title}
                  />
                  <motion.div 
                    className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className={`w-6 h-6 ${type.color}`} />
                  </motion.div>
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
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">🔒</div>
              <div className="text-sm text-muted-foreground">Blockchain-verified ownership and licensing</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-accent mb-2">⚡</div>
              <div className="text-sm text-muted-foreground">Instant royalty distribution to creators</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
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