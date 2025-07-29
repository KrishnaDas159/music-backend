import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Coins, Users } from "lucide-react";

const mockVaults = [
  {
    id: 1,
    songTitle: "Midnight Symphony",
    artist: "Aurora Collective",
    totalInvested: "$5,200",
    vaultBalance: "$6,840",
    apy: "15.2%",
    investors: 142,
    utilization: 78,
    protocol: "Cetus Finance",
    image: "/src/public/assets/album-1.jpg"
  },
  {
    id: 2,
    songTitle: "Ocean Depths",
    artist: "Tidal Force",
    totalInvested: "$3,800",
    vaultBalance: "$4,560",
    apy: "12.8%",
    investors: 89,
    utilization: 65,
    protocol: "Sui Lend",
    image: "/src/public/assets/album-2.jpg"
  },
  {
    id: 3,
    songTitle: "Stellar Journey",
    artist: "Cosmic Drift",
    totalInvested: "$7,100",
    vaultBalance: "$8,920",
    apy: "18.5%",
    investors: 203,
    utilization: 84,
    protocol: "Scallop",
    image: "/src/public/assets/album-3.jpg"
  }
];

export function RevenueVaultsTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {mockVaults.map((vault) => (
          <Card key={vault.id} className="glass-panel hover-scale">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={vault.image}
                    alt={vault.songTitle}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">
                      {vault.songTitle}
                    </h3>
                    <p className="text-muted-foreground text-lg">{vault.artist}</p>
                    <Badge variant="outline" className="mt-2">
                      {vault.protocol}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {vault.apy}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current APY
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Invested</span>
                    <Coins className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-semibold">{vault.totalInvested}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Vault Balance</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-semibold">{vault.vaultBalance}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Investors</span>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-semibold">{vault.investors}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vault Utilization</span>
                  <span className="text-sm font-medium">{vault.utilization}%</span>
                </div>
                <Progress value={vault.utilization} className="h-2" />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 glow-golden">
                  Invest More
                </Button>
                <Button variant="outline" className="flex-1">
                  View Analytics
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}