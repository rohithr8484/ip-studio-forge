import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Minimize2, Maximize2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAccount, useWalletClient, useSwitchChain } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { custom, toHex } from "viem";
import { storyAeneidTestnet } from "@/lib/web3-config";
import { WalletConnect } from "@/components/WalletConnect";

type Message = { role: "user" | "assistant"; content: string };

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { isConnected, address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();
  const isCorrectNetwork = chain?.id === storyAeneidTestnet.id;

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-abv`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (resp.status === 429 || resp.status === 402) {
        const error = await resp.json();
        toast({
          title: "Error",
          description: error.error,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            setIsLoading(false);
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
  };

  const handleRegisterAsIP = (content: string) => {
    setSelectedContent(content);
    setRegisterDialogOpen(true);
  };

  const registerIP = async () => {
    if (!isConnected || !walletClient || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to register IP.",
        variant: "destructive",
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: "Please switch to Story Aeneid Testnet.",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);
    try {
      const config: StoryConfig = {
        wallet: walletClient,
        transport: custom(walletClient.transport),
        chainId: 'aeneid',
      };
      
      const client = StoryClient.newClient(config);

      const timestamp = new Date().toISOString();
      const contentHash = toHex(selectedContent.substring(0, 100), { size: 32 });

      const response = await client.ipAsset.registerIpAsset({
        nft: {
          type: 'mint',
          spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc',
        },
        ipMetadata: {
          ipMetadataURI: `https://surra.app/ai-content/${timestamp}`,
          ipMetadataHash: contentHash,
          nftMetadataURI: `https://surra.app/ai-content/${timestamp}`,
          nftMetadataHash: contentHash,
        },
      });

      console.log('IP registered successfully:', response);

      toast({
        title: "Success!",
        description: `IP Asset registered! IPA ID: ${response.ipId}`,
      });

      setRegisterDialogOpen(false);
    } catch (error) {
      console.error("IP Registration Error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register IP",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-16 w-16 rounded-full shadow-glow bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <MessageCircle className="h-8 w-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-full max-w-md"
          >
            <Card className="overflow-hidden shadow-2xl border-primary/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                  <h3 className="font-semibold text-white">Surra AI Assistant</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Content */}
              {!isMinimized && (
                <>
                  <ScrollArea className="h-96 p-4 bg-background" ref={scrollRef}>
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                        <div>
                          <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Ask me anything about IP registration, music rights, or AI training data!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.role === "assistant" && !isLoading && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRegisterAsIP(msg.content)}
                                className="mt-1 text-xs text-muted-foreground hover:text-primary"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Register as IP
                              </Button>
                            )}
                          </motion.div>
                        ))}
                        {isLoading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-muted rounded-2xl px-4 py-2">
                              <div className="flex gap-1">
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-200" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border bg-background">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IP Registration Dialog */}
      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register AI Response as IP</DialogTitle>
            <DialogDescription>
              Register this AI-generated content as intellectual property on Story Protocol (Aeneid Testnet)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg max-h-40 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap">{selectedContent}</p>
            </div>

            {!isConnected ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Connect your wallet to register this content as IP</p>
                <WalletConnect />
              </div>
            ) : !isCorrectNetwork ? (
              <div className="space-y-2">
                <p className="text-sm text-destructive">Please switch to Story Aeneid Testnet</p>
                <Button onClick={() => switchChain({ chainId: storyAeneidTestnet.id })} className="w-full">
                  Switch Network
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                <Button 
                  onClick={registerIP} 
                  disabled={isRegistering}
                  className="w-full"
                >
                  {isRegistering ? "Registering..." : "Register as IP Asset"}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
