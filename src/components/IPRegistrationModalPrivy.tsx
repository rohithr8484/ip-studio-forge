import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music, Mail } from "lucide-react";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { StoryClient, StoryConfig, EncodedTxData } from '@story-protocol/core-sdk';
import { PrivyLogin } from './PrivyLogin';
import { http, toHex } from 'viem';

export const IPRegistrationModalPrivy = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  
  const [formData, setFormData] = useState({
    ipName: "",
    ipType: "music",
    description: "",
    mediaUrl: "",
  });

  // Get the embedded wallet
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ready || !authenticated) {
      toast({
        title: "Not Logged In",
        description: "Please log in with Privy first",
        variant: "destructive",
      });
      return;
    }

    if (!embeddedWallet) {
      toast({
        title: "Wallet Not Ready",
        description: "Please wait for your wallet to be created",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get the provider and switch to Story network
      await embeddedWallet.switchChain(1315);
      const provider = await embeddedWallet.getEthereumProvider();

      // Initialize Story Protocol SDK
      const config: StoryConfig = {
        account: embeddedWallet.address as `0x${string}`,
        transport: http('https://aeneid.storyrpc.io'),
        chainId: 'aeneid',
      };
      
      const client = StoryClient.newClient(config);

      // Register IP Asset on Story Protocol
      const response = await client.ipAsset.registerIpAsset({
        nft: {
          type: 'mint',
          spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc',
        },
        ipMetadata: {
          ipMetadataURI: formData.mediaUrl || 'https://example.com/metadata',
          ipMetadataHash: toHex(formData.ipName, { size: 32 }),
          nftMetadataURI: formData.mediaUrl || 'https://example.com/nft-metadata',
          nftMetadataHash: toHex(formData.description || formData.ipName, { size: 32 }),
        },
      });

      // Send transaction using Privy's smart wallet
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [(response.encodedTxData as EncodedTxData).data],
      });

      console.log('IP registered successfully. TX:', txHash);

      toast({
        title: "IP Registered Successfully!",
        description: `"${formData.ipName}" registered on Story Protocol`,
      });

      setFormData({
        ipName: "",
        ipType: "music",
        description: "",
        mediaUrl: "",
      });
      setOpen(false);

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register IP on Story Protocol",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="group">
          <Mail className="w-4 h-4 mr-2" />
          Register with Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register Music IP (Email Login)</DialogTitle>
          <DialogDescription>
            Use email login to register your music on Story Protocol
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 space-y-3">
          <PrivyLogin />
          
          {authenticated && embeddedWallet && (
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                ✓ Logged in: {embeddedWallet.address.slice(0, 6)}...{embeddedWallet.address.slice(-4)}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ipName-privy">IP Name *</Label>
            <Input
              id="ipName-privy"
              placeholder="My Awesome Remix"
              value={formData.ipName}
              onChange={(e) => setFormData({ ...formData, ipName: e.target.value })}
              required
              disabled={!authenticated}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipType-privy">IP Type *</Label>
            <Select
              value={formData.ipType}
              onValueChange={(value) => setFormData({ ...formData, ipType: value })}
              disabled={!authenticated}
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
            <Label htmlFor="description-privy">Description</Label>
            <Textarea
              id="description-privy"
              placeholder="Describe your music IP..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              disabled={!authenticated}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaUrl-privy">Media URL</Label>
            <Input
              id="mediaUrl-privy"
              type="url"
              placeholder="https://..."
              value={formData.mediaUrl}
              onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
              disabled={!authenticated}
            />
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
              disabled={loading || !authenticated || !embeddedWallet}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : !authenticated ? (
                'Login First'
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
