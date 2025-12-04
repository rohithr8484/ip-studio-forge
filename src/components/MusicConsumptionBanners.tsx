import { Card } from "@/components/ui/card";
import { Music2, Sparkles, Disc3 } from "lucide-react";
import { IPRegistrationModal } from "./IPRegistrationModal";
import { RemixMusicModal } from "./RemixMusicModal";
import { motion } from "framer-motion";
import ringtone1 from "@/assets/ringtone-1.jpg";
import ringtone2 from "@/assets/ringtone-2.jpg";
import ringtone3 from "@/assets/ringtone-3.jpg";
import ringtone4 from "@/assets/ringtone-4.jpg";
import ringtone5 from "@/assets/ringtone-5.jpg";
import ringtone6 from "@/assets/ringtone-6.jpg";

const banners = [
  {
    icon: Music2,
    title: "Synching Music to Memes",
    gradient: "from-pink-500/20 via-purple-500/20 to-blue-500/20",
    iconGradient: "from-pink-500 to-purple-500",
    images: [ringtone1, ringtone5],
  },
  {
    icon: Disc3,
    title: "On-Chain Music Mixing Tech",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    iconGradient: "from-blue-500 to-cyan-500",
    images: [ringtone2, ringtone4],
  },
  {
    icon: Sparkles,
    title: "IP Consumption Marketplace",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    iconGradient: "from-amber-500 to-orange-500",
    images: [ringtone3, ringtone6],
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
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-0 md:gap-8">
                    {/* Image Section - Now showing 2 images */}
                    <div className="relative w-full md:w-1/2 h-80 md:h-[500px] overflow-hidden flex">
                      {banner.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="relative w-1/2 h-full">
                          <img 
                            src={img} 
                            alt={`${banner.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 md:bg-gradient-to-r md:from-transparent md:to-background/80" />
                      <div className={`absolute top-6 left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${banner.iconGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                        <Icon className="w-10 h-10 text-white" />
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