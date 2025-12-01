import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
        { type: "social", authProviderId: "twitch", mode: "popup" },
        {
          type: "social",
          authProviderId: "auth0",
          mode: "popup",
          auth0Connection: "discord",
          displayName: "Discord",
          logoUrl: "/images/discord.svg",
          scope: "openid profile",
        },
        {
          type: "social",
          authProviderId: "auth0",
          mode: "popup",
          auth0Connection: "twitter",
          displayName: "Twitter",
          logoUrl: "/images/twitter.svg",
          logoUrlDark: "/images/twitter-dark.svg",
          scope: "openid profile",
        },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "30e7ffaff99063e68cc9870c105d905b" },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

// Get API key from environment
const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY || "UAY-aXY7hgAI5oTxXdtVcW1oi3mjuo4g";

export const config = createConfig(
  {
    transport: alchemy({ apiKey }),
    chain: sepolia,
    ssr: false,
    enablePopupOauth: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
