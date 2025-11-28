import { PrivyClientConfig } from '@privy-io/react-auth';
import { storyAeneidTestnet } from './web3-config';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['email', 'wallet', 'google'],
  appearance: {
    theme: 'dark',
    accentColor: '#8B5CF6',
    logo: 'https://docs.story.foundation/~gitbook/image?url=https%3A%2F%2F1148605382-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKwuxPVrS3UIa7CU1%252Flogo%252FOH4bKNojHWNYmJMJf7o3%252FStory%2520Logo%2520Mark.png%3Falt%3Dmedia%26token%3D42b57be0-cdd0-403b-aaf1-1d7ee4db2b06&width=32&dpr=2&quality=100&sign=e8e20a10&sv=2',
  },
  embeddedWallets: {
    ethereum: {
      createOnLogin: 'users-without-wallets',
    },
  },
  defaultChain: storyAeneidTestnet,
  supportedChains: [storyAeneidTestnet],
};
