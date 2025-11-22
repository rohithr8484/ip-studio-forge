import { Card } from "@/components/ui/card";
import { Wand2, Shield, Coins, Share2 } from "lucide-react";

const steps = [
  {
    icon: Wand2,
    number: "01",
    title: "Create with AI",
    description: "Use our integrated AI tools to generate unique content - art, music, text, or code.",
  },
  {
    icon: Shield,
    number: "02",
    title: "Automatic Registration",
    description: "Your creation is instantly registered on Story Protocol blockchain with proof of ownership.",
  },
  {
    icon: Coins,
    number: "03",
    title: "Set Licensing Terms",
    description: "Define how others can use your IP with customizable licensing options and royalties.",
  },
  {
    icon: Share2,
    number: "04",
    title: "Monetize & Share",
    description: "Share your protected IP, earn royalties, and track usage across the ecosystem.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to create, protect, and monetize your AI-generated IP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card relative z-10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-6xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};