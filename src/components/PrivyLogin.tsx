import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Mail, LogOut } from 'lucide-react';

export function PrivyLogin() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return (
      <Button disabled variant="outline">
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    return (
      <Button
        onClick={logout}
        variant="outline"
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        {user.email?.address ? user.email.address.slice(0, 15) + '...' : 'Logout'}
      </Button>
    );
  }

  return (
    <Button
      onClick={login}
      className="gap-2"
    >
      <Mail className="h-4 w-4" />
      Login with Email
    </Button>
  );
}
