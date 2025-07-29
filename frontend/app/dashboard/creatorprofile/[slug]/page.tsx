'use client'

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Music,
  Heart,
  Users,
  BarChart3,
  Upload,
  Copy,
  TrendingUp,
  ArrowLeft,
  Wallet
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";


export default function CreatorProfile() {
  const navigate = useRouter();
  const params = useParams();
  const creatorId  = params.slug; 
  const [activeTab, setActiveTab] = useState("my-nfts");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [nfts, setNfts] = useState<any[]>([]);

  const [liked, setLiked] = useState<string[]>([]);
  const [vaultStats, setVaultStats] = useState<any[]>([]);
  const [followingList, setFollowingList] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [tokenizeEnabled, setTokenizeEnabled] = useState(false);
  const [tokenPercentage, setTokenPercentage] = useState([30]); // or [0]
  const [pricePerToken, setPricePerToken] = useState('');
  const [numberOfTokens, setNumberOfTokens] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);



  const tabs = [
    { id: "my-nfts", label: "My NFTs", icon: Music },
    { id: "liked-songs", label: "Liked Songs", icon: Heart },
    { id: "following", label: "Following", icon: Users },
    { id: "vault-stats", label: "Vault Stats", icon: BarChart3 },
    { id: "revenue", label: "Revenue", icon: TrendingUp },
    { id: "upload", label: "Upload Track", icon: Upload },
  ];
  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const [profileRes, nftRes, likedRes, revenueRes, followingRes, vaultRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}/nfts`),

          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}/liked-songs`),

          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}/revenue`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}/following`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/creator/${creatorId}/vaults`),
        ]);

        if (
          !profileRes.ok ||
          !nftRes.ok ||
          !likedRes.ok ||
          !followingRes.ok ||
          !vaultRes.ok ||
          !revenueRes.ok
        ) {
          throw new Error("One or more requests failed");
        }

        const profile = await profileRes.json();
        const nfts = await nftRes.json();

        const followingList = await followingRes.json();
        const liked = await likedRes.json();
        const vaultStats = await vaultRes.json();
        const revenue = await revenueRes.json();

        setUserData(profile);
        setNfts(nfts);
        setVaultStats(vaultStats);
        setLiked(liked);
        setFollowingList(followingList);
        setRevenue(revenue);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreatorData();
  }, [creatorId]);

  const handleUpload = async () => {
    if (!musicFile || !thumbnail || !title || !genre || !description) {
      alert("Please fill in all required fields and upload files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("musicFile", musicFile);
    formData.append("thumbnailFile", thumbnail);
    formData.append("tokenized", tokenizeEnabled);
    formData.append("tokenAddress", "0x123"); // Replace with real address if needed
    formData.append("tokenSupply", numberOfTokens);
    formData.append("creatorAddress", "0xab687687c"); // Replace with real address if needed
    formData.append("revenueSplit", JSON.stringify({
      artist: 100 - tokenPercentage[0],
      platform: tokenPercentage[0]
    }));
    formData.append("transactionHash", "0x456w4345465"); // Replace with actual hash or leave blank

    try {
      const response = await fetch("http://localhost:3000/api/music/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data);
        // setShowUploadModal(true);
      } else {
        console.error("Upload failed");
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error occurred during upload");
    }
  };



  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div className="min-h-screen emerald-bg relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 right-32 w-96 h-96 bg-gradient-radial from-yellow-400/25 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-radial from-emerald-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button and Wallet Connect */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate.push("/dashboard")}
              className="flex items-center space-x-2 text-emerald-700 hover:text-golden-glow hover:bg-golden-glow/10 rounded-xl p-3 glow-golden"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Button>

            <Button
              onClick={handleConnectWallet}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${isWalletConnected
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white"
                } glow-golden`}
            >
              <Wallet className="w-5 h-5" />
              <span>{isWalletConnected ? "Connected" : "Connect Wallet"}</span>
            </Button>
          </div>

          {/* Profile Header */}
          {userData && (
            <Card className="glass-panel rounded-3xl p-8 mb-8 glow-golden float">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-400/20 to-transparent"></div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-emerald-800 mb-2">{userData.name}</h1>
                    <Badge className="bg-blue-500/20 text-blue-700 border-blue-300 mb-3">
                      Verified Creator
                    </Badge>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-emerald-600">
                      <span className="font-mono text-sm">{userData.walletAddress}</span>
                      <Button variant="ghost" size="sm" className="hover:text-golden-glow glow-golden">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-800">{userData.followers}</p>
                      <p className="text-sm text-emerald-600">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-800">{userData.following}</p>
                      <p className="text-sm text-emerald-600">Following</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}


          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white glow-golden"
                    : "text-emerald-600 hover:text-golden-glow hover:bg-golden-glow/10"
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "my-nfts" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft, index) => (
                  <Card key={nft.id} className="glass-panel rounded-2xl p-6 float" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="space-y-4">
                      <img src={nft.cover} alt={nft.title} className="w-full aspect-square rounded-xl object-cover" />
                      <div>
                        <h3 className="font-semibold text-emerald-800">{nft.title}</h3>
                        <p className="text-sm text-emerald-600">{nft.artist}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-emerald-600">Status</p>
                          <p className="font-semibold">{nft.owned}</p>
                        </div>
                        <div>
                          <p className="text-sm text-emerald-600">Earnings</p>
                          <p className="font-semibold text-green-600">{nft.earnings}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {activeTab === "liked-songs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liked.length === 0 ? (
                  <Card className="glass-panel rounded-2xl p-8 text-center">
                    <Heart className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">No Liked Songs Yet</h3>
                    <p className="text-emerald-600">Your favorite tracks will appear here once you like some.</p>
                  </Card>
                ) : (
                  liked.map((liked, index) => (
                    <Card key={liked.id} className="glass-panel rounded-2xl p-6 float" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="space-y-4">
                        <img src={liked.cover} alt={liked.title} className="w-full aspect-square rounded-xl object-cover" />
                        <div>
                          <h3 className="font-semibold text-emerald-800">{liked.title}</h3>
                          <p className="text-sm text-emerald-600">{liked.artist}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "following" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followingList?.length === 0 ? (
                  <Card className="glass-panel rounded-2xl p-8 text-center">
                    <Users className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">No Followings Yet</h3>
                    <p className="text-emerald-600">Creators you follow will be listed here.</p>
                  </Card>
                ) : (
                  followingList.map((creator, index) => (
                    <Card key={creator.id} className="glass-panel rounded-2xl p-6 float" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center space-x-4">
                        <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow" />
                        <div>
                          <h3 className="font-semibold text-emerald-800">{creator.name}</h3>
                          <p className="text-sm text-emerald-600">{creator.genre || "Music Creator"}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "vault-stats" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaultStats.map((vault, index) => (
                  <Card key={vault.title} className="glass-panel rounded-2xl p-6 float" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-800">{vault.title}</h3>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>Vault Revenue</span>
                          <span className="font-medium text-blue-600">{vault.vaultRevenue}</span>
                        </div>
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>Yield Earned</span>
                          <span className="font-medium text-green-600">{vault.yieldEarned}</span>
                        </div>
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>DAO Support</span>
                          <span className="font-medium text-purple-600">{vault.daoSupport}</span>
                        </div>
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>Protocol</span>
                          <span className="font-medium text-emerald-700">{vault.protocol}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}


            {activeTab === "revenue" && (
              <div className="space-y-6">
                {revenue.map((item, index) => (
                  <Card key={item.title} className="glass-panel rounded-2xl p-6 float" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-1">
                        <h3 className="font-semibold text-emerald-800">{item.title}</h3>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-emerald-600">Vault Revenue</p>
                        <p className="font-semibold text-blue-600">{item.vaultRevenue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-emerald-600">Yield Earned</p>
                        <p className="font-semibold text-green-600">{item.yieldEarned}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-emerald-600">DAO Support</p>
                        <p className="font-semibold text-purple-600">{item.daoSupport}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-emerald-600">Protocol</p>
                        <p className="font-semibold text-emerald-600">{item.protocol}</p>
                      </div>
                      <div className="text-center">
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white glow-golden">
                          Withdraw {item.withdrawable}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "upload" && (
              <Card className="glass-panel rounded-3xl p-8 glow-golden float">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-2">Upload New Music</h2>
                    <p className="text-emerald-600">Create and tokenize your latest track</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">Music File</label>
                        <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-golden-glow transition-colors glow-golden">
                          <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                          <p className="text-emerald-600">Drag & drop MP3/WAV file</p>
                          <input
                            type="file"
                            accept=".mp3,.wav"
                            onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                            className="mt-4"
                          />

                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">Thumbnail</label>
                        <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-golden-glow transition-colors glow-golden">
                          <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                          <p className="text-emerald-600">Upload cover art</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                            className="mt-4"
                          />

                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">Song Title</label>
                        <Input
                          placeholder="Enter song title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="rounded-xl border-emerald-300"
                        />

                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">Genre</label>
                        <Input
                          placeholder="Enter genre"
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                          className="rounded-xl border-emerald-300"
                        />

                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-2">Description</label>
                      <Textarea value={description}
                        onChange={(e) => setDescription(e.target.value)} placeholder="Describe your music..." className="rounded-xl border-emerald-300" rows={3} />
                    </div>

                    <div className="space-y-4 p-6 bg-white/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-emerald-800">Tokenize this music</span>
                        <Switch checked={tokenizeEnabled} onCheckedChange={setTokenizeEnabled} />
                      </div>

                      {tokenizeEnabled && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-2">
                              Tokenization Percentage: {tokenPercentage[0]}%
                            </label>
                            <Slider
                              value={tokenPercentage}
                              onValueChange={setTokenPercentage}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-2">Price per Token</label>
                            <Input
                              placeholder="Enter price per token"
                              value={pricePerToken}
                              onChange={(e) => setPricePerToken(e.target.value)}
                              className="rounded-xl border-emerald-300"
                            />

                          </div>
                          <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-2">Number of Tokens to Mint</label>
                            <Input
                              placeholder="Enter no. of token"
                              value={numberOfTokens}
                              onChange={(e) => setNumberOfTokens(e.target.value)}
                              className="rounded-xl border-emerald-300"
                            />

                          </div>

                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => setShowUploadModal(true)}
                      className="w-full py-4 text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white glow-golden"
                    >
                      Create and Tokenize
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Placeholder content for other tabs */}
            {activeTab === "liked-songs" && (
              <Card className="glass-panel rounded-2xl p-8 text-center">
                <Heart className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">Liked Songs</h3>
                <p className="text-emerald-600">Your favorite tracks will appear here</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Upload Success Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-panel rounded-3xl p-8 max-w-md w-full glow-golden slide-in-right">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto pulse-golden">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">Upload Successful!</h3>
                <p className="text-emerald-600">Your music has been uploaded and tokenized successfully.</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600">Status:</span>
                  <span className="font-semibold text-green-600">Processing</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600">Tokens Created:</span>
                  <span className="font-semibold text-yellow-600">{numberOfTokens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600">Your Share:</span>
                  <span className="font-semibold text-purple-600">{100 - tokenPercentage[0]}%</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  handleUpload();
                  setShowUploadModal(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white glow-golden"
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};