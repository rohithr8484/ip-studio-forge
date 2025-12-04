import { Card } from "@/components/ui/card";
import { Music2, Sparkles, Disc3, Play, Pause } from "lucide-react";
import { IPRegistrationModal } from "./IPRegistrationModal";
import { RemixMusicModal } from "./RemixMusicModal";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import musicIp1 from "@/assets/music-ip-1.jpg";
import musicIp2 from "@/assets/music-ip-2.jpg";
import musicIp3 from "@/assets/music-ip-3.jpg";
import musicIp4 from "@/assets/music-ip-4.jpg";
import musicIp5 from "@/assets/music-ip-5.jpg";
import musicIp6 from "@/assets/music-ip-6.jpg";

// Audio player component for ringtones
const AudioPlayer = ({ 
  audioSrc, 
  coverImage, 
  title 
}: { 
  audioSrc?: string; 
  coverImage: string; 
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="relative w-1/2 aspect-square overflow-hidden group/audio">
      <img 
        src={coverImage} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/audio:opacity-100 transition-opacity duration-300">
        <button 
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-primary-foreground" />
          ) : (
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          )}
        </button>
        <span className="text-white text-sm mt-2 font-medium">
          {audioSrc ? (isPlaying ? "Playing..." : "Play Ringtone") : "Sample Audio"}
        </span>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
        <div 
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      {audioSrc && (
        <audio 
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}
    </div>
  );
};

const banners = [
  {
    icon: Music2,
    title: "Synching Music to Memes",
    gradient: "from-pink-500/20 via-purple-500/20 to-blue-500/20",
    iconGradient: "from-pink-500 to-purple-500",
    ringtones: [
      { cover: musicIp1, title: "Ringtone 1" },
      { cover: musicIp2, title: "Ringtone 2" },
    ],
  },
  {
    icon: Disc3,
    title: "On-Chain Music Mixing Tech",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    iconGradient: "from-blue-500 to-cyan-500",
    ringtones: [
      { cover: musicIp3, title: "Ringtone 1" },
      { cover: musicIp4, title: "Ringtone 2" },
    ],
  },
  {
    icon: Sparkles,
    title: "IP Consumption Marketplace",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    iconGradient: "from-amber-500 to-orange-500",
    ringtones: [
      { cover: musicIp5, title: "Ringtone 1" },
      { cover: musicIp6, title: "Ringtone 2" },
    ],
  },
];

export const MusicConsumptionBanners = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Music2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Music IP Consumption</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Creative Frontend
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Music-focused tech that involves the consumption of IP
          </p>
        </motion.div>

        <div className="space-y-8">
          {banners.map((banner, index) => {
            const Icon = banner.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  className={`relative overflow-hidden bg-gradient-to-br ${banner.gradient} backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group`}
                >
                  <div className="relative z-10 flex flex-col md:flex-row items-stretch">
                    {/* Audio Players Section - 50% each */}
                    <div className="relative w-full md:w-1/2 flex">
                      {banner.ringtones.map((ringtone, idx) => (
                        <AudioPlayer
                          key={idx}
                          coverImage={ringtone.cover}
                          title={`${banner.title} ${ringtone.title}`}
                        />
                      ))}
                      <div className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${banner.iconGradient} flex items-center justify-center z-10 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-grow p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-4xl md:text-5xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {banner.title}
                        </h3>
                      </div>

                      <div className="flex flex-col gap-3 flex-shrink-0">
                        <IPRegistrationModal defaultType="Music" />
                        <RemixMusicModal defaultType="remix" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Blockchain-Verified Rights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Automated Royalty Splits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Instant IP Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>PIL License Flavors</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};