import { useAuthModal, useUser, useLogout } from "@account-kit/react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function AlchemyWalletConnect() {
  const { openAuthModal } = useAuthModal();
  const user = useUser();
  const { logout, isLoggingOut } = useLogout();

  if (user) {
    const displayAddress = user.address 
      ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
      : user.email || "Connected";
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => logout()}
          variant="outline"
          className="gap-2 border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {displayAddress}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={openAuthModal}
        className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    </motion.div>
  );
}
