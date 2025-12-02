import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music, Sparkles, Info } from "lucide-react";
import { useAccount, useWalletClient, useSwitchChain } from 'wagmi';
import { StoryClient, StoryConfig, PILFlavor, WIP_TOKEN_ADDRESS } from '@story-protocol/core-sdk';
import { WalletConnect } from './WalletConnect';
import { custom, toHex, parseEther, Address } from 'viem';
import { storyAeneidTestnet } from '@/lib/web3-config';

// PIL License Flavors based on Story Protocol documentation
// https://docs.story.foundation/concepts/programmable-ip-license/pil-flavors
const PIL_FLAVORS = {
  basic: {
    name: "PIL-Basic",
    description: "Non-Commercial Social Remixing - Viral/frictionless. Free remixing with attribution, no commercial use.",
    badge: "Story-First",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    // Uses pre-registered licenseTermsId = 1
    termsId: 1n,
  },
  revenueShare: {
    name: "PIL-With-Revenue-Sharing",
    description: "Commercial Remix - Auto-splits. Allows commercialization with automatic royalty distribution.",
    badge: "Monetized",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    commercialRevShare: 10, // 10% revenue share
    mintingFee: "0.01", // 0.01 $WIP minting fee
  },
  derivatives: {
    name: "PIL-With-Derivatives",
    description: "Creative Commons Attribution - Deep remix ecosystems. Free commercialization with lineage tracking.",
    badge: "Ecosystem",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    commercialRevShare: 0,
    mintingFee: "0",
  },
  commercial: {
    name: "PIL-With-Commercial-Rights",
    description: "Commercial Use - DSPs/Brands/Sales. Allows selling and licensing, no derivative creation.",
    badge: "Licenseable",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    mintingFee: "0.1", // Higher fee for commercial use
    derivativesAllowed: false,
  },
};

type PILFlavorKey = keyof typeof PIL_FLAVORS;

// Story Protocol Contract Addresses on Aeneid Testnet
const STORY_CONTRACTS = {
  spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc' as Address,
  royaltyPolicyLAP: '0x28b4F70ffE5ba7A26aEF979226f77Eb57fb9Fdb6' as Address,
  wipToken: WIP_TOKEN_ADDRESS,
};

export const RemixMusicModal = ({ 
  defaultType = "remix",
  parentIpId,
}: { 
  defaultType?: string;
  parentIpId?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<PILFlavorKey>("basic");
  const { toast } = useToast();
  const { address, isConnected, chain } = useAccount();
  const { data: walletClient, isLoading: isWalletLoading } = useWalletClient();
  const { switchChain } = useSwitchChain();
  
  const [formData, setFormData] = useState({
    remixName: "",
    parentIpId: parentIpId || "",
    description: "",
    mediaUrl: "",
  });

  const isCorrectNetwork = chain?.id === storyAeneidTestnet.id;

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

    if (!isCorrectNetwork) {
      try {
        await switchChain({ chainId: storyAeneidTestnet.id });
      } catch (error) {
        toast({
          title: "Network Switch Failed",
          description: "Please manually switch to Story Aeneid Testnet",
          variant: "destructive",
        });
        return;
      }
    }

    if (!walletClient) {
      toast({
        title: "Error",
        description: "Wallet client not available. Please try reconnecting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const config: StoryConfig = {
        wallet: walletClient,
        transport: custom(walletClient.transport),
        chainId: 'aeneid',
      };
      
      const client = StoryClient.newClient(config);

      // Build license terms based on selected PIL flavor
      let licenseTermsData;
      
      if (selectedFlavor === 'basic') {
        // Use pre-registered Non-Commercial Social Remixing terms (licenseTermsId = 1)
        licenseTermsData = [{ 
          terms: PILFlavor.nonCommercialSocialRemixing() 
        }];
      } else if (selectedFlavor === 'revenueShare') {
        // Commercial Remix with revenue sharing
        const revShareFlavor = PIL_FLAVORS.revenueShare;
        licenseTermsData = [{
          terms: PILFlavor.commercialRemix({
            commercialRevShare: revShareFlavor.commercialRevShare,
            defaultMintingFee: parseEther(revShareFlavor.mintingFee),
            currency: STORY_CONTRACTS.wipToken,
          }),
        }];
      } else if (selectedFlavor === 'derivatives') {
        // Creative Commons Attribution - free commercialization
        licenseTermsData = [{
          terms: PILFlavor.commercialRemix({
            commercialRevShare: 0,
            defaultMintingFee: 0n,
            currency: STORY_CONTRACTS.wipToken,
          }),
        }];
      } else if (selectedFlavor === 'commercial') {
        // Commercial Use only (no derivatives)
        const commercialFlavor = PIL_FLAVORS.commercial;
        licenseTermsData = [{
          terms: PILFlavor.commercialUse({
            defaultMintingFee: parseEther(commercialFlavor.mintingFee),
            currency: STORY_CONTRACTS.wipToken,
          }),
        }];
      }

      let response;

      if (formData.parentIpId) {
        // Register as derivative of existing IP
        // First mint license token from parent, then register derivative
        const mintResponse = await client.license.mintLicenseTokens({
          licensorIpId: formData.parentIpId as Address,
          licenseTermsId: 1n, // Using basic terms for remixing
          amount: 1n,
          receiver: address,
        });

        console.log('License token minted:', mintResponse);

        // Register derivative with the license token
        response = await client.ipAsset.registerDerivativeWithLicenseTokens({
          childIpId: formData.parentIpId as Address, // This will create new IP
          licenseTokenIds: [mintResponse.licenseTokenIds?.[0] || 1n],
        });
      } else {
        // Register as new IP with license terms attached
        response = await client.ipAsset.registerIpAsset({
          nft: {
            type: 'mint',
            spgNftContract: STORY_CONTRACTS.spgNftContract,
          },
          licenseTermsData,
          ipMetadata: {
            ipMetadataURI: formData.mediaUrl || 'https://surra.io/remix-metadata',
            ipMetadataHash: toHex(formData.remixName, { size: 32 }),
            nftMetadataURI: formData.mediaUrl || 'https://surra.io/remix-nft-metadata',
            nftMetadataHash: toHex(formData.description || formData.remixName, { size: 32 }),
          },
        });
      }

      console.log('Remix registered successfully:', response);

      toast({
        title: "Remix Created Successfully!",
        description: `"${formData.remixName}" registered with ${PIL_FLAVORS[selectedFlavor].name} license. IPA ID: ${response.ipId}`,
      });

      setFormData({
        remixName: "",
        parentIpId: parentIpId || "",
        description: "",
        mediaUrl: "",
      });
      setOpen(false);

    } catch (error: any) {
      console.error('Remix registration error:', error);
      toast({
        title: "Remix Failed",
        description: error.message || "Failed to create remix on Story Protocol",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10">
          <Music className="w-4 h-4 mr-2" />
          Remix Music
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Create Music Remix on Story Protocol
          </DialogTitle>
          <DialogDescription>
            Select a PIL license flavor and create an on-chain remix with automatic royalty distribution.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 space-y-3">
          <WalletConnect />
          
          {isConnected && !isCorrectNetwork && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                Wrong network. Please switch to Story Aeneid Testnet.
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

        {/* PIL Flavor Selection */}
        <div className="space-y-3 mb-6">
          <Label className="flex items-center gap-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            Select PIL License Flavor
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.entries(PIL_FLAVORS) as [PILFlavorKey, typeof PIL_FLAVORS[PILFlavorKey]][]).map(([key, flavor]) => (
              <div
                key={key}
                onClick={() => setSelectedFlavor(key)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedFlavor === key
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{flavor.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${flavor.color}`}>
                    {flavor.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {flavor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="remixName">Remix Name *</Label>
            <Input
              id="remixName"
              placeholder="My Epic Remix"
              value={formData.remixName}
              onChange={(e) => setFormData({ ...formData, remixName: e.target.value })}
              required
              disabled={!isConnected || !isCorrectNetwork}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentIpId">Parent IP Address (optional)</Label>
            <Input
              id="parentIpId"
              placeholder="0x..."
              value={formData.parentIpId}
              onChange={(e) => setFormData({ ...formData, parentIpId: e.target.value })}
              disabled={!isConnected || !isCorrectNetwork}
            />
            <p className="text-xs text-muted-foreground">
              Enter the IP Asset address you want to remix. Leave empty to create a new root IP.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your remix..."
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
                  Creating Remix...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Remix
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Solidity Reference Info */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            On-Chain Implementation
          </h4>
          <p className="text-xs text-muted-foreground mb-2">
            This remix uses Story Protocol's deployed smart contracts for PIL license management:
          </p>
          <code className="text-xs block bg-background p-2 rounded border overflow-x-auto">
            {`// Solidity PIL Terms Structure
struct PILTerms {
  bool transferable;
  address royaltyPolicy;
  uint256 defaultMintingFee;
  bool commercialUse;
  uint32 commercialRevShare;
  bool derivativesAllowed;
  bool derivativesAttribution;
  address currency;
}`}
          </code>
        </div>
      </DialogContent>
    </Dialog>
  );
};
