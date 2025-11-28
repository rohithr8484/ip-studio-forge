import { http, createConfig } from 'wagmi';
import { odysseyTestnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [odysseyTestnet],
  connectors: [injected()],
  transports: {
    [odysseyTestnet.id]: http(),
  },
});
