import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle2 } from "lucide-react";

export const ChallengeDescription = () => {
  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Challenge Description
            </h2>
          </div>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-card backdrop-blur-sm border-primary/30">
          <div className="space-y-6">
            <div>
              <p className="text-lg text-foreground leading-relaxed">
                <span className="font-semibold text-primary">JUXTAMODE</span> is a platform for registering and remixing digital art as IP assets. This challenge asks you to either create original artwork or remix existing IP-protected pieces on their platform, then share your creations publicly.
              </p>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Minimum 4 pieces in your collection
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Must be registered as a collection on JUXTAMODE
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Video animation preferred, but still images accepted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};