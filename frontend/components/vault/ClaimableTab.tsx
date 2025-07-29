import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock, CheckCircle } from "lucide-react";

const mockClaimable = [
  {
    id: 1,
    songTitle: "Quantum Waves",
    artist: "Digital Horizon",
    claimableAmount: "$485.20",
    yieldType: "Lending Rewards",
    daysAccrued: 7,
    status: "ready",
    image: "/src/public/assets/album-1.jpg"
  },
  {
    id: 2,
    songTitle: "Solar Flares",
    artist: "Cosmic Echo",
    claimableAmount: "$289.75",
    yieldType: "Staking Rewards",
    daysAccrued: 5,
    status: "ready",
    image: "/src/public/assets/album-2.jpg"
  },
  {
    id: 3,
    songTitle: "Nebula Dreams",
    artist: "Stellar Wave",
    claimableAmount: "$156.40",
    yieldType: "LP Rewards",
    daysAccrued: 3,
    status: "pending",
    image: "/src/public/assets/album-3.jpg"
  }
];

export function ClaimableTab() {
  const totalClaimable = mockClaimable
    .filter(item => item.status === "ready")
    .reduce((sum, item) => sum + parseFloat(item.claimableAmount.replace("$", "").replace(",", "")), 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="glass-accent">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Total Claimable Rewards
              </h3>
              <div className="text-3xl font-bold text-emerald-600">
                ${totalClaimable.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <Button size="lg" className="glow-golden pulse-golden">
                <Gift className="w-5 h-5 mr-2" />
                Claim All
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Individual Claimable Items */}
      <div className="grid gap-4">
        {mockClaimable.map((item) => (
          <Card key={item.id} className="glass-panel hover-scale">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.songTitle}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">
                      {item.songTitle}
                    </h4>
                    <p className="text-muted-foreground">{item.artist}</p>
                    <Badge 
                      variant="outline" 
                      className="mt-2"
                    >
                      {item.yieldType}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {item.claimableAmount}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.daysAccrued} days accrued
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.status === "ready" ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-600">Ready to claim</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-600">Processing</span>
                      </>
                    )}
                  </div>
                  
                  <Button 
                    variant={item.status === "ready" ? "default" : "outline"}
                    size="sm"
                    disabled={item.status !== "ready"}
                    className={item.status === "ready" ? "glow-golden" : ""}
                  >
                    {item.status === "ready" ? "Claim" : "Pending"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}