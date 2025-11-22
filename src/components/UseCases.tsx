import { Card } from "@/components/ui/card";
import { Palette, Music, FileText, Video, Code, Image } from "lucide-react";

const useCases = [
  {
    icon: Palette,
    title: "AI-Generated Art",
    description: "Create unique digital artwork with AI and automatically register IP rights on-chain.",
    color: "text-accent",
  },
  {
    icon: Music,
    title: "Music & Audio",
    description: "Compose original music using AI tools with instant copyright protection.",
    color: "text-primary",
  },
  {
    icon: FileText,
    title: "Written Content",
    description: "Generate articles, stories, and scripts with AI while securing your authorship.",
    color: "text-accent",
  },
  {
    icon: Video,
    title: "Video Creation",
    description: "Produce AI-assisted video content with built-in IP registration and licensing.",
    color: "text-primary",
  },
  {
    icon: Code,
    title: "Software & Code",
    description: "Develop AI-generated code snippets and protect your software innovations.",
    color: "text-accent",
  },
  {
    icon: Image,
    title: "Brand Assets",
    description: "Design logos, graphics, and brand materials with AI and secure brand rights.",
    color: "text-primary",
  },
];

export const UseCases = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Popular IP × AI Use Cases
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore how creators are leveraging AI with blockchain-based IP protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${useCase.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground">
                  {useCase.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};