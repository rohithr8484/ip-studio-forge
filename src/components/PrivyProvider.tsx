import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { privyConfig } from '@/lib/privy-config';
import { config } from '@/lib/web3-config';

const queryClient = new QueryClient();

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

  if (!privyAppId) {
    console.error('VITE_PRIVY_APP_ID is not set in environment variables');
    return <>{children}</>;
  }

  return (
    <BasePrivyProvider
      appId={privyAppId}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </BasePrivyProvider>
  );
}
