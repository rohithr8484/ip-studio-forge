import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "@/lib/alchemy-config";
import { PropsWithChildren } from "react";

export function AlchemyProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
      >
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
