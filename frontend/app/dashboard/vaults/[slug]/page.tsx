'use client';

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyTokensTab } from "@/components/vault/MyTokensTab";
import { RevenueVaultsTab } from "@/components/vault/RevenueVaultsTab";
import { ClaimableTab } from "@/components/vault/ClaimableTab";
import Link from "next/link";
import { useWallet } from "@suiet/wallet-kit";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { getVaultObjectId } from "@/lib/getObjectId";

const PACKAGE_ID = `${process.env.NEXT_PUBLIC_SUI_PACKAGE}`
const MODULE = "vault";

export default function Vaults() {
  const [activeTab, setActiveTab] = useState("my-tokens");
  const wallet = useWallet();
  const [vaultId, setVaultId] = useState<any>(null);

  useEffect(() => {
    const fetchVault = async () => {
      if (wallet.connected && wallet.account?.address) {
        const id = await getVaultObjectId(wallet.account.address, 'vault');
        setVaultId(id);
        console.log("🔑 Vault ID:", id);
      }
    };

    fetchVault();
  }, [wallet.connected, wallet.account]);
  const claimRewards = async (userTokens: number, compound: boolean) => {
    if (!wallet.connected) return console.warn("🚫 Wallet not connected");

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE}::claim_rewards`,
      arguments: [
        tx.object(vaultId),
        tx.pure.u64(BigInt(userTokens)),
        tx.pure.bool(compound)
      ],
    });

    try {
      const res = await wallet.signAndExecuteTransaction({ transaction: tx });
      console.log("✅ claim_rewards success:", res);
      toast.success("Claim successful");
    } catch (err) {
      console.error("❌ claim_rewards failed:", err);
      toast.error("Claim failed");
    }
  };

  const withdrawAfterBurn = async (burnedTokens: number) => {
    if (!wallet.connected) return console.warn("🚫 Wallet not connected");

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE}::withdraw_after_burn`,
      arguments: [
        tx.object(vaultId),
        tx.pure.u64(burnedTokens),
      ],
    });

    try {
      const res = await wallet.signAndExecuteTransaction({ transaction: tx });
      console.log("✅ withdraw_after_burn success:", res);
      toast.success("Withdraw successful");
    } catch (err) {
      console.error("❌ withdraw_after_burn failed:", err);
      toast.error("Withdraw failed");
    }
  };

  return (
    <div className="min-h-screen emerald-bg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-emerald-700 hover:text-golden-glow hover:bg-golden-glow/10 rounded-xl p-3 glow-golden transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Vaults</h1>
          <p className="text-lg text-muted-foreground">
            Monitor your investments and harvest your yields with serene ease
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-panel">
            <TabsTrigger value="my-tokens" className="data-[state=active]:glow-golden transition-all duration-500">
              My Tokens
            </TabsTrigger>
            <TabsTrigger value="revenue-vaults" className="data-[state=active]:glow-golden transition-all duration-500">
              Revenue Vaults
            </TabsTrigger>
            <TabsTrigger value="claimable" className="data-[state=active]:glow-golden transition-all duration-500">
              Claimable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-tokens" className="fade-in">
            <MyTokensTab />
          </TabsContent>

          <TabsContent value="revenue-vaults" className="fade-in">
            <RevenueVaultsTab />
          </TabsContent>

          <TabsContent value="claimable" className="fade-in">
            <ClaimableTab
              onClaim={(id) => {
                console.log("Claim clicked for item ID:", id);
                claimRewards(100, false); // Replace 100 with real token logic
              }}
              onClaimAll={() => {
                claimRewards(100, false); // Loop or sum logic here
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
