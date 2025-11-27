import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music } from "lucide-react";

export const IPRegistrationModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    ipName: "",
    ipType: "music",
    description: "",
    mediaUrl: "",
    environment: "staging"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('register-ip', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "IP Registered Successfully!",
        description: data.message || "Your music IP has been registered on Story Protocol",
      });

      // Reset form
      setFormData({
        ipName: "",
        ipType: "music",
        description: "",
        mediaUrl: "",
        environment: "staging"
      });
      setOpen(false);

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register IP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="lg" className="group">
          Register Music IP
          <Music className="w-4 h-4 group-hover:scale-110 transition-transform ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register Music IP on Story Protocol</DialogTitle>
          <DialogDescription>
            Register your music creation with blockchain-verified ownership
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ipName">IP Name *</Label>
            <Input
              id="ipName"
              placeholder="My Awesome Remix"
              value={formData.ipName}
              onChange={(e) => setFormData({ ...formData, ipName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipType">IP Type *</Label>
            <Select
              value={formData.ipType}
              onValueChange={(value) => setFormData({ ...formData, ipType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="stem">Stem</SelectItem>
                <SelectItem value="ringtone">Ringtone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your music IP..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              id="mediaUrl"
              type="url"
              placeholder="https://..."
              value={formData.mediaUrl}
              onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Environment</Label>
            <Select
              value={formData.environment}
              onValueChange={(value) => setFormData({ ...formData, environment: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staging">Staging (Testnet)</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register IP'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
