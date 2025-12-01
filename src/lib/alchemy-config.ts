import { alchemy, sepolia } from "@account-kit/infra";
import { createConfig, type AlchemyAccountsUIConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { defineChain } from "viem";

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

// UI config for Alchemy Account Kit with dark styling
const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
      ],
      [
        {
          type: "external_wallets",
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
  modalBaseClassName: "alchemy-dark-modal",
};

// Get API key from environment
const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY || "UAY-aXY7hgAI5oTxXdtVcW1oi3mjuo4g";

export const alchemyConfig = createConfig(
  {
    transport: alchemy({ apiKey }),
    chain: sepolia,
    ssr: false,
  },
  uiConfig
);

export const queryClient = new QueryClient();
