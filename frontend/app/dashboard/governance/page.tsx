'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, Filter, Users, TrendingUp, Clock, CheckCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const mockProposals = [
  {
    id: 1,
    title: "Increase Vault Yield Distribution to 85%",
    description: "Proposal to increase the revenue distribution to vault holders from 75% to 85%, reducing platform fees to attract more investors.",
    category: "Revenue Distribution",
    status: "active",
    votesFor: 2847,
    votesAgainst: 456,
    votesAbstain: 123,
    timeLeft: "5 days",
    proposer: "0x742d...8a1b",
    impact: "High",
    userVoted: null
  },
  {
    id: 2,
    title: "Add Scallop Protocol for Yield Generation",
    description: "Integrate Scallop lending protocol as an additional yield source for vault funds, potentially increasing APY by 2-4%.",
    category: "Yield Protocol",
    status: "active",
    votesFor: 1923,
    votesAgainst: 234,
    votesAbstain: 89,
    timeLeft: "3 days",
    proposer: "0x8b3c...9f2e",
    impact: "Medium",
    userVoted: "for"
  },
  {
    id: 3,
    title: "Implement Dark Mode Theme",
    description: "Add dark mode support to the platform UI for better user experience during late-night trading sessions.",
    category: "UI Upgrade",
    status: "passed",
    votesFor: 3124,
    votesAgainst: 145,
    votesAbstain: 67,
    timeLeft: "Ended",
    proposer: "0x4a7e...6c8d",
    impact: "Low",
    userVoted: "for"
  }
];

const userRole = "creator"; // This would come from context/state

export default function Governance() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [walletConnected, setWalletConnected] = useState(false);

  const categories = [
    "all",
    "Revenue Distribution",
    "Yield Protocol",
    "Vault Settings",
    "UI Upgrade",
    "Platform Features"
  ];

  const filteredProposals = selectedCategory === "all"
      ? mockProposals
      : mockProposals.filter(p => p.category === selectedCategory);

  const handleVote = (proposalId: number, vote: "for" | "against" | "abstain") => {
    console.log(`Voting ${vote} on proposal ${proposalId}`);
    // Implementation would handle voting logic
  };

  return (
      <div className="min-h-screen serene-bg">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
                onClick={() => router.push("/dashboard")}
                className="back-button flex items-center space-x-2 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              DAO Governance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Shape the future of the platform through community-driven proposals and voting
            </p>
          </div>

          {/* Remaining JSX stays unchanged */}
          {/* ... */}
        </div>
      </div>
  );
}
