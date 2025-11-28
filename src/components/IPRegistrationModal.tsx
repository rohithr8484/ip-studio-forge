import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music } from "lucide-react";
import { useAccount, useWalletClient, useSwitchChain } from 'wagmi';
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { WalletConnect } from './WalletConnect';
import { custom, toHex } from 'viem';
import { storyAeneidTestnet } from '@/lib/web3-config';

export const IPRegistrationModal = ({ defaultType }: { defaultType?: string } = {}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { address, isConnected, chain } = useAccount();
  const { data: walletClient, isLoading: isWalletLoading } = useWalletClient();
  const { switchChain } = useSwitchChain();
  
  const [formData, setFormData] = useState({
    ipName: "",
    ipType: defaultType?.toLowerCase() || "music",
    description: "",
    mediaUrl: "",
  });

  // Check if on correct network
  const isCorrectNetwork = chain?.id === storyAeneidTestnet.id;

  // Debug logging
  console.log('Wallet status:', { 
    isConnected, 
    address, 
    chain: chain?.name, 
    chainId: chain?.id,
    expectedChainId: storyAeneidTestnet.id,
    isCorrectNetwork,
    hasWalletClient: !!walletClient, 
    isWalletLoading 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // Check network and switch if needed
    if (!isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: "Switching to Story Aeneid Testnet...",
      });
      try {
        await switchChain({ chainId: storyAeneidTestnet.id });
      } catch (error) {
        toast({
          title: "Network Switch Failed",
          description: "Please manually switch to Story Aeneid Testnet in your wallet",
          variant: "destructive",
        });
        return;
      }
    }

    if (isWalletLoading) {
      toast({
        title: "Please Wait",
        description: "Wallet is initializing...",
      });
      return;
    }

    if (!walletClient) {
      console.error('Wallet client not available. Debug info:', { isConnected, address, chain, isWalletLoading });
      toast({
        title: "Error",
        description: "Wallet client not available. Please try reconnecting your wallet.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Initialize Story Protocol SDK (correct way for wagmi)
      const config: StoryConfig = {
        wallet: walletClient,
        transport: custom(walletClient.transport),
        chainId: 'aeneid', // Story testnet
      };
      
      const client = StoryClient.newClient(config);

      // Register IP Asset on Story Protocol with proper metadata
      const response = await client.ipAsset.registerIpAsset({
        nft: {
          type: 'mint',
          spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc', // Story's default SPG NFT contract
        },
        ipMetadata: {
          ipMetadataURI: formData.mediaUrl || 'https://example.com/metadata',
          ipMetadataHash: toHex(formData.ipName, { size: 32 }),
          nftMetadataURI: formData.mediaUrl || 'https://example.com/nft-metadata',
          nftMetadataHash: toHex(formData.description || formData.ipName, { size: 32 }),
        },
      });

      console.log('IP registered successfully:', response);

      toast({
        title: "IP Registered Successfully!",
        description: `"${formData.ipName}" registered on Story Protocol. IPA ID: ${response.ipId}`,
      });

      setFormData({
        ipName: "",
        ipType: defaultType?.toLowerCase() || "music",
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
        <Button variant="hero" size="lg" className="w-full">
          Register as IP on Story
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register Music IP on Story Protocol</DialogTitle>
          <DialogDescription>
            Connect your wallet and register your music on the blockchain
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 space-y-3">
          <WalletConnect />
          
          {isConnected && !isCorrectNetwork && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                Wrong network detected. Please switch to Story Aeneid Testnet (Chain ID: {storyAeneidTestnet.id})
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => switchChain({ chainId: storyAeneidTestnet.id })}
              >
                Switch Network
              </Button>
            </div>
          )}
          
          {isConnected && isCorrectNetwork && (
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                ✓ Connected to Story Aeneid Testnet
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ipName">IP Name *</Label>
            <Input
              id="ipName"
              placeholder="My Awesome Remix"
              value={formData.ipName}
              onChange={(e) => setFormData({ ...formData, ipName: e.target.value })}
              required
              disabled={!isConnected || !isCorrectNetwork}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipType">IP Type *</Label>
            <Select
              value={formData.ipType}
              onValueChange={(value) => setFormData({ ...formData, ipType: value })}
              disabled={!isConnected || !isCorrectNetwork}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="stem">Stem</SelectItem>
                <SelectItem value="ringtone">Ringtone</SelectItem>
                <SelectItem value="pov videos">PoV Videos</SelectItem>
                <SelectItem value="drone footage">Drone Footage</SelectItem>
                <SelectItem value="xr motion capture">XR Motion Capture</SelectItem>
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
              disabled={!isConnected || !isCorrectNetwork}
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
              disabled={!isConnected || !isCorrectNetwork}
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
              disabled={loading || !isConnected || isWalletLoading || !isCorrectNetwork}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : isWalletLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : !isCorrectNetwork ? (
                'Switch Network First'
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
