// Surra Platform v2.0
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlchemyProvider } from "@/components/AlchemyProvider";
import { Web3Provider } from "@/components/Web3Provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <Web3Provider>
    <AlchemyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AlchemyProvider>
  </Web3Provider>
);

export default App;
