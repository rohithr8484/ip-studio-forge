import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { UseCases } from "@/components/UseCases";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div id="use-cases">
        <UseCases />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="features">
        <Features />
      </div>
      <CTA />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary"></div>
                <span className="text-xl font-bold text-foreground">StoryIP</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered IP creation and protection built on Story Protocol.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2024 StoryIP. Built with Story Protocol SDK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;