import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, ArrowLeft } from "lucide-react";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import { useRouter } from "next/navigation";

const Analytics = () => {
    const navigate = useRouter();
    const vaults : any = [
        {
            id: 1,
            name: "Ethereal Beats Vault",
            symbol: "EBV",
            image: album1,
            currentPrice: "$12.45",
            priceChange: "+5.2%",
            priceChangePositive: true,
            tvl: "$2.4M",
            supply: "192,500",
            circulating: "185,200",
            bondingCurve: {
                slope: 0.000025,
                fees: "0.5%",
                target: "$15.00"
            },
            chartData: [8, 12, 10, 15, 13, 18, 12, 16, 14, 12]
        },
        {
            id: 2,
            name: "Ambient Flow Vault",
            symbol: "AFV",
            image: album2,
            currentPrice: "$8.92",
            priceChange: "-2.1%",
            priceChangePositive: false,
            tvl: "$1.8M",
            supply: "201,750",
            circulating: "195,400",
            bondingCurve: {
                slope: 0.000018,
                fees: "0.3%",
                target: "$10.50"
            },
            chartData: [12, 14, 11, 9, 10, 8, 9, 11, 8, 9]
        },
        {
            id: 3,
            name: "Synthwave Vault",
            symbol: "SWV",
            image: album3,
            currentPrice: "$22.18",
            priceChange: "+12.8%",
            priceChangePositive: true,
            tvl: "$3.1M",
            supply: "139,800",
            circulating: "132,600",
            bondingCurve: {
                slope: 0.000045,
                fees: "0.7%",
                target: "$28.00"
            },
            chartData: [18, 20, 19, 22, 24, 21, 23, 25, 22, 22]
        }
    ];

    const MiniChart = ({ data, positive }: { data: number[], positive: boolean }) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;

        return (
            <div className="w-20 h-8 relative">
                <svg viewBox="0 0 80 32" className="w-full h-full">
                    <polyline
                        fill="none"
                        stroke={positive ? "hsl(var(--success-green))" : "hsl(var(--destructive))"}
                        strokeWidth="1.5"
                        points={data.map((value, index) => {
                            const x = (index / (data.length - 1)) * 80;
                            const y = 32 - ((value - min) / range) * 32;
                            return `${x},${y}`;
                        }).join(' ')}
                    />
                </svg>
            </div>
        );
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
                <h1 className="text-4xl font-bold gradient-text">Vault Analytics</h1>
                <p className="text-muted-foreground">Real-time bonding curve analytics for your music vaults</p>
            </div>

            {/* Market Overview */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warm-orange/20 mx-auto mb-3">
                        <DollarSign className="w-6 h-6 text-warm-orange" />
                    </div>
                    <h3 className="text-2xl font-bold">$7.3M</h3>
                    <p className="text-sm text-muted-foreground">Total Value Locked</p>
                </div>

                <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-soft-blue/20 mx-auto mb-3">
                        <Users className="w-6 h-6 text-soft-blue" />
                    </div>
                    <h3 className="text-2xl font-bold">2,847</h3>
                    <p className="text-sm text-muted-foreground">Active Holders</p>
                </div>

                <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-green/20 mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-success-green" />
                    </div>
                    <h3 className="text-2xl font-bold">+8.4%</h3>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                </div>

                <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning-amber/20 mx-auto mb-3">
                        <Activity className="w-6 h-6 text-warning-amber" />
                    </div>
                    <h3 className="text-2xl font-bold">147</h3>
                    <p className="text-sm text-muted-foreground">24h Trades</p>
                </div>
            </section>

            {/* Vault Cards */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-warm-orange" />
                    <span>Bonding Curve Analytics</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {vaults.map((vault : any) => (
                        <div key={vault.id} className="floating-card space-y-6">
                            {/* Header */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={vault.image}
                                    alt={vault.name}
                                    className="w-16 h-16 rounded-xl object-cover shadow-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{vault.name}</h3>
                                    <p className="text-sm text-muted-foreground">{vault.symbol}</p>
                                </div>
                                <Badge
                                    variant={vault.priceChangePositive ? "default" : "destructive"}
                                    className={vault.priceChangePositive ? "bg-success-green hover:bg-success-green/80" : ""}
                                >
                                    {vault.priceChangePositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                    {vault.priceChange}
                                </Badge>
                            </div>

                            {/* Price & Chart */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">{vault.currentPrice}</p>
                                        <p className="text-xs text-muted-foreground">Current Price</p>
                                    </div>
                                    <MiniChart data={vault.chartData} positive={vault.priceChangePositive} />
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">TVL</p>
                                    <p className="font-semibold">{vault.tvl}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Target Price</p>
                                    <p className="font-semibold text-warm-orange">{vault.bondingCurve.target}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Supply</p>
                                    <p className="font-semibold">{vault.supply}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Circulating</p>
                                    <p className="font-semibold">{vault.circulating}</p>
                                </div>
                            </div>

                            {/* Bonding Curve Parameters */}
                            <div className="glass p-4 rounded-lg space-y-2">
                                <h4 className="font-medium text-sm">Bonding Curve Parameters</h4>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Slope:</span>
                                    <span>{vault.bondingCurve.slope}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Fees:</span>
                                    <span>{vault.bondingCurve.fees}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <Button variant="ghost" className="flex-1 group">
                                    <div className="flex items-center space-x-2">
                                        <span>Buy</span>
                                        <div className="w-2 h-2 rounded-full bg-current opacity-60 group-hover:animate-pulse"></div>
                                    </div>
                                </Button>
                                <Button variant="secondary" className="flex-1">
                                    Sell
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Analytics;