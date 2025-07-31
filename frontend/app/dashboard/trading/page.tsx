import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Plus, TrendingUp, Zap, Star, ArrowLeft } from "lucide-react";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import { useRouter } from "next/navigation";

const Trading = () => {
    const navigate = useRouter();
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [liquidityToken1, setLiquidityToken1] = useState("");
    const [liquidityToken2, setLiquidityToken2] = useState("");

    const tokens = [
        { symbol: "EBV", name: "Ethereal Beats Vault", image: album1, price: "$12.45", change: "+5.2%" },
        { symbol: "AFV", name: "Ambient Flow Vault", image: album2, price: "$8.92", change: "-2.1%" },
        { symbol: "SWV", name: "Synthwave Vault", image: album3, price: "$22.18", change: "+12.8%" },
        { symbol: "USDC", name: "USD Coin", image: null, price: "$1.00", change: "0.0%" },
        { symbol: "ETH", name: "Ethereum", image: null, price: "$2,340", change: "+3.1%" }
    ];

    const liquidityPairs : any = [
        {
            id: 1,
            name: "EBV/USDC",
            images: [album1, null],
            apy: "24.5%",
            tvl: "$842K",
            rewards: "EBV + SONIC",
            userLiquidity: "$1,250"
        },
        {
            id: 2,
            name: "AFV/ETH",
            images: [album2, null],
            apy: "18.7%",
            tvl: "$623K",
            rewards: "AFV + SONIC",
            userLiquidity: "$890"
        },
        {
            id: 3,
            name: "SWV/USDC",
            images: [album3, null],
            apy: "32.1%",
            tvl: "$1.2M",
            rewards: "SWV + SONIC",
            userLiquidity: "$2,100"
        }
    ];

    const rewards = [
        { token: "SONIC", amount: "125.67", value: "$89.23", isStaking: true },
        { token: "EBV", amount: "12.45", value: "$155.12", isStaking: false },
        { token: "AFV", amount: "8.92", value: "$79.58", isStaking: true }
    ];

    const TokenSelector = ({ value, onChange, tokens }: any) => (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border border-glass-border/30 rounded-lg p-3 text-foreground"
        >
            <option value="">Select Token</option>
            {tokens.map((token: any) => (
                <option key={token.symbol} value={token.symbol} className="bg-background">
                    {token.symbol} - {token.name}
                </option>
            ))}
        </select>
    );

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
                <h1 className="text-4xl font-bold gradient-text">AMM Trading</h1>
                <p className="text-muted-foreground">Trade vault tokens and provide liquidity for passive earnings</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Trading Panel */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Token Swap */}
                    <Card className="glass-card">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <ArrowLeftRight className="w-6 h-6 text-warm-orange" />
                                <h2 className="text-xl font-semibold">Token Swap</h2>
                            </div>

                            <div className="space-y-4">
                                {/* From Token */}
                                <div className="glass p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-muted-foreground">From</label>
                                        <span className="text-xs text-muted-foreground">Balance: 1,250 EBV</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <Input
                                            placeholder="0.0"
                                            value={fromAmount}
                                            onChange={(e) => setFromAmount(e.target.value)}
                                            className="flex-1 bg-transparent border-glass-border/30"
                                        />
                                        <TokenSelector value="EBV" onChange={() => { }} tokens={tokens} />
                                    </div>
                                </div>

                                {/* Swap Arrow */}
                                <div className="flex justify-center">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <ArrowLeftRight className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* To Token */}
                                <div className="glass p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-muted-foreground">To</label>
                                        <span className="text-xs text-muted-foreground">Balance: 5,420 USDC</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <Input
                                            placeholder="0.0"
                                            value={toAmount}
                                            onChange={(e) => setToAmount(e.target.value)}
                                            className="flex-1 bg-transparent border-glass-border/30"
                                        />
                                        <TokenSelector value="USDC" onChange={() => { }} tokens={tokens} />
                                    </div>
                                </div>

                                {/* Trade Info */}
                                <div className="glass p-3 rounded-lg space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Exchange Rate</span>
                                        <span>1 EBV = 12.45 USDC</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Price Impact</span>
                                        <span className="text-success-green">0.12%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Trading Fee</span>
                                        <span>0.3%</span>
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Swap Tokens
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Add Liquidity */}
                    <Card className="glass-card">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <Plus className="w-6 h-6 text-soft-blue" />
                                <h2 className="text-xl font-semibold">Add Liquidity</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass p-4 rounded-lg space-y-3">
                                        <label className="text-sm text-muted-foreground">Token 1</label>
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="0.0"
                                                value={liquidityToken1}
                                                onChange={(e) => setLiquidityToken1(e.target.value)}
                                                className="bg-transparent border-glass-border/30"
                                            />
                                            <TokenSelector value="EBV" onChange={() => { }} tokens={tokens} />
                                        </div>
                                    </div>

                                    <div className="glass p-4 rounded-lg space-y-3">
                                        <label className="text-sm text-muted-foreground">Token 2</label>
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="0.0"
                                                value={liquidityToken2}
                                                onChange={(e) => setLiquidityToken2(e.target.value)}
                                                className="bg-transparent border-glass-border/30"
                                            />
                                            <TokenSelector value="USDC" onChange={() => { }} tokens={tokens} />
                                        </div>
                                    </div>
                                </div>

                                <div className="glass p-3 rounded-lg space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pool Share</span>
                                        <span>0.15%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">LP Tokens</span>
                                        <span>~125.67 EBV-USDC</span>
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Liquidity
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* LP Rewards */}
                    <Card className="glass-card">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <Star className="w-5 h-5 text-warm-orange vinyl-spin" />
                                <span>LP Rewards</span>
                            </h3>

                            <div className="space-y-3">
                                {rewards.map((reward) => (
                                    <div key={reward.token} className="glass p-3 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">{reward.token}</span>
                                            {reward.isStaking && (
                                                <Badge variant="outline" className="text-success-green text-xs">
                                                    Staking
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Amount</span>
                                            <span>{reward.amount}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Value</span>
                                            <span className="text-success-green">{reward.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="secondary" size="sm" className="w-full">
                                Claim All Rewards
                            </Button>
                        </div>
                    </Card>

                    {/* Liquidity Pools */}
                    <Card className="glass-card">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5 text-soft-blue" />
                                <span>Your Liquidity</span>
                            </h3>

                            <div className="space-y-3">
                                {liquidityPairs.map((pair : any) => (
                                    <div key={pair.id} className="glass p-3 rounded-lg space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex -space-x-1">
                                                    {pair.images.map((image : any, idx : any) => (
                                                        <div key={idx} className="w-6 h-6 rounded-full bg-muted border border-background overflow-hidden">
                                                            {image && <img src={image} alt="" className="w-full h-full object-cover" />}
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="font-medium text-sm">{pair.name}</span>
                                            </div>
                                            <Badge variant="default" className="bg-success-green text-xs">
                                                {pair.apy}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-muted-foreground">Your Liquidity</span>
                                                <p className="font-medium">{pair.userLiquidity}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Pool TVL</span>
                                                <p className="font-medium">{pair.tvl}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Trading;