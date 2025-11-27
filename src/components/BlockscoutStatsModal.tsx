import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";

interface BlockscoutStats {
  average_block_time: number;
  coin_price: string;
  gas_prices: {
    slow: number;
    average: number;
    fast: number;
  };
  network_utilization_percentage: number;
  total_addresses: string;
  total_blocks: string;
  total_transactions: string;
  transactions_today: string;
}

export const BlockscoutStatsModal = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data - replace with actual API call in production
  const stats: BlockscoutStats = {
    average_block_time: 2364,
    coin_price: "4.83",
    gas_prices: {
      slow: 0.1,
      average: 0.57,
      fast: 1.05
    },
    network_utilization_percentage: 10.8968948333333,
    total_addresses: "686024",
    total_blocks: "1765700",
    total_transactions: "5606580",
    transactions_today: "221320"
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="group">
          <Activity className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Network Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Blockchain Network Statistics</DialogTitle>
          <DialogDescription>
            Real-time network metrics powered by Blockscout API
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Network Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coin Price</p>
                  <p className="text-2xl font-bold text-foreground">${stats.coin_price}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Time</p>
                  <p className="text-2xl font-bold text-foreground">{(stats.average_block_time / 1000).toFixed(1)}s</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Gas Prices */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
              <Zap className="w-4 h-4 text-primary" />
              Gas Prices (Gwei)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-muted-foreground mb-1">Slow</p>
                <p className="text-lg font-bold text-foreground">{stats.gas_prices.slow}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs text-muted-foreground mb-1">Average</p>
                <p className="text-lg font-bold text-foreground">{stats.gas_prices.average}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-muted-foreground mb-1">Fast</p>
                <p className="text-lg font-bold text-foreground">{stats.gas_prices.fast}</p>
              </div>
            </div>
          </Card>

          {/* Network Statistics */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
              <Users className="w-4 h-4 text-primary" />
              Network Activity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Addresses</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(stats.total_addresses)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Blocks</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(stats.total_blocks)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(stats.total_transactions)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Today's Transactions</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(stats.transactions_today)}</p>
              </div>
            </div>
          </Card>

          {/* Network Utilization */}
          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Network Utilization</p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.network_utilization_percentage.toFixed(2)}%
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button onClick={() => setOpen(false)} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
