import { Card } from "@/components/ui/card";
import { Music2, Sparkles, Disc3 } from "lucide-react";
import { IPRegistrationModal } from "./IPRegistrationModal";

const banners = [
  {
    icon: Music2,
    title: "Synching Music to Memes",
    description: "Create viral meme content with perfectly synced music. Register your music-meme combinations as unique IP assets on-chain.",
    gradient: "from-pink-500/20 via-purple-500/20 to-blue-500/20",
    iconGradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Disc3,
    title: "On-Chain Music Mixing Tech",
    description: "Revolutionary blockchain-powered mixing technology. Layer stems, apply effects, and register every mix as verifiable IP with automated royalty splits.",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    iconGradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "IP Consumption Marketplace",
    description: "Transform your music into ringtones, samples, loops, and more. Every derivative work is tracked and monetized on-chain.",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    iconGradient: "from-amber-500 to-orange-500",
  },
];

export const MusicConsumptionBanners = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Music2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Music IP Consumption</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Every Sound, Every Right, On-Chain
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From viral memes to custom ringtones, every use of your music is tracked, protected, and monetized through Story Protocol
          </p>
        </div>

        <div className="space-y-8">
          {banners.map((banner, index) => {
            const Icon = banner.icon;
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden p-8 md:p-12 bg-gradient-to-br ${banner.gradient} backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group`}
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className={`flex-shrink-0 w-24 h-24 rounded-3xl bg-gradient-to-br ${banner.iconGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {banner.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {banner.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <IPRegistrationModal defaultType="Music" />
                  </div>
                </div>
                
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
};