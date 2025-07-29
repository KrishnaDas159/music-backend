import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const mockTokens = [
  {
    id: 1,
    songTitle: "Ethereal Dreams",
    artist: "Lunar Echo",
    tokensOwned: 150,
    currentValue: "$2,450",
    change: "+12.5%",
    image: "/src/public/assets/album-1.jpg"
  },
  {
    id: 2,
    songTitle: "Digital Sunrise",
    artist: "Neon Waves",
    tokensOwned: 75,
    currentValue: "$1,825",
    change: "+8.2%",
    image: "/src/public/assets/album-2.jpg"
  },
  {
    id: 3,
    songTitle: "Cosmic Breeze",
    artist: "Stellar Mind",
    tokensOwned: 200,
    currentValue: "$3,100",
    change: "+15.7%",
    image: "/src/public/assets/album-3.jpg"
  }
];

export function MyTokensTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTokens.map((token) => (
          <Card key={token.id} className="glass-panel hover-scale group cursor-pointer">
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={token.image}
                  alt={token.songTitle}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground truncate">
                    {token.songTitle}
                  </h3>
                  <p className="text-muted-foreground">{token.artist}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tokens Owned</span>
                  <Badge variant="secondary" className="font-medium">
                    {token.tokensOwned}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Value</span>
                  <span className="font-semibold text-lg">{token.currentValue}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">24h Change</span>
                  <div className="flex items-center space-x-1 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{token.change}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full glow-golden"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}