import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, XCircle, Vote, Users, ArrowLeft } from "lucide-react";
import album1 from "@/public/assets/album1.jpg";
import album2 from "@/public/assets/album2.jpg";
import album3 from "@/public/assets/album3.jpg";
import { useRouter } from "next/navigation";

const Governance = () => {
  const navigate = useRouter();
  const vaults : any = [
    {
      id: 1,
      name: "Ethereal Beats Vault",
      symbol: "EBV",
      image: album1,
      balance: "1,250",
      apy: "12.5%",
      tvl: "$2.4M"
    },
    {
      id: 2,
      name: "Ambient Flow Vault",
      symbol: "AFV", 
      image: album2,
      balance: "850",
      apy: "9.8%",
      tvl: "$1.8M"
    },
    {
      id: 3,
      name: "Synthwave Vault",
      symbol: "SWV",
      image: album3,
      balance: "2,100",
      apy: "15.2%",
      tvl: "$3.1M"
    }
  ];

  const proposals = [
    {
      id: 1,
      title: "Approve new yield strategies",
      description: "Migrate from Aave to Compound for higher yields",
      status: "active",
      endTime: "2 days, 4 hours",
      forVotes: 12450,
      againstVotes: 3200,
      totalVotes: 15650,
      userVoted: false,
      vaultId: 1
    },
    {
      id: 2,
      title: "Migrate from Yearn v2 → v3",
      description: "Upgrade to latest Yearn infrastructure for better security",
      status: "active",
      endTime: "5 days, 12 hours",
      forVotes: 8900,
      againstVotes: 1200,
      totalVotes: 10100,
      userVoted: true,
      vaultId: 2
    },
    {
      id: 3,
      title: "Pause underperforming strategies",
      description: "Temporarily halt risky DeFi protocols pending security audit",
      status: "passed",
      endTime: "Ended",
      forVotes: 18500,
      againstVotes: 2100,
      totalVotes: 20600,
      userVoted: true,
      vaultId: 3
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4 text-warning-amber" />;
      case "passed":
        return <CheckCircle className="w-4 h-4 text-success-green" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "warning-amber";
      case "passed":
        return "success-green";
      case "failed":
        return "destructive";
      default:
        return "muted";
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => navigate.push("/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">DAO Governance</h1>
        <p className="text-muted-foreground">Shape the future of your music vaults through decentralized governance</p>
      </div>

      {/* Vault Holdings */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Users className="w-6 h-6 text-warm-orange" />
          <span>Your Vault Holdings</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaults.map((vault : any) => (
            <div key={vault.id} className="floating-card group">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={vault.image} 
                  alt={vault.name}
                  className="w-16 h-16 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div>
                  <h3 className="font-semibold text-lg">{vault.name}</h3>
                  <p className="text-sm text-muted-foreground">{vault.symbol}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className="font-medium">{vault.balance} {vault.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">APY</span>
                  <span className="text-success-green font-medium">{vault.apy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVL</span>
                  <span className="font-medium">{vault.tvl}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Proposals */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Vote className="w-6 h-6 text-warm-orange" />
          <span>Governance Proposals</span>
        </h2>

        <div className="space-y-6">
          {proposals.map((proposal) => {
            const vault = vaults.find(v  => v.id === proposal.vaultId);
            const votePercentage = (proposal.forVotes / proposal.totalVotes) * 100;
            
            return (
              <div key={proposal.id} className="floating-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {vault && (
                      <img 
                        src={vault.image} 
                        alt={vault.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(proposal.status)}
                        <h3 className="text-lg font-semibold">{proposal.title}</h3>
                        <Badge variant="outline" className={`text-${getStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{proposal.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {vault?.name} • {proposal.endTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>For: {proposal.forVotes.toLocaleString()} votes</span>
                      <span>Against: {proposal.againstVotes.toLocaleString()} votes</span>
                    </div>
                    <Progress value={votePercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      {votePercentage.toFixed(1)}% in favor • {proposal.totalVotes.toLocaleString()} total votes
                    </p>
                  </div>

                  {proposal.status === "active" && (
                    <div className="flex items-center space-x-3 pt-2">
                      {proposal.userVoted ? (
                        <Badge variant="outline" className="text-warm-orange">
                          ✓ Voted
                        </Badge>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm">
                            Vote For
                          </Button>
                          <Button variant="secondary" size="sm">
                            Vote Against
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Governance;