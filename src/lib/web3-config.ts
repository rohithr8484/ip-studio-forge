import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { injected } from 'wagmi/connectors';

// Define Story Aeneid Testnet chain
export const storyAeneidTestnet = defineChain({
  id: 1315,
  name: 'Story Aeneid Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IP',
    symbol: 'IP',
  },
  rpcUrls: {
    default: { http: ['https://aeneid.storyrpc.io'] },
  },
  blockExplorers: {
    default: { name: 'Story Explorer', url: 'https://aeneid.storyscan.io' },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [storyAeneidTestnet],
  connectors: [injected()],
  transports: {
    [storyAeneidTestnet.id]: http('https://aeneid.storyrpc.io'),
  },
});
