
//backend/data/creatorData.js
export const creators = {
    "1": {
      id: "1",
      name: "Alex Chen",
      walletAddress: "0x1234...5678",
      avatar: "/assets/user-avatar.jpg", 
      followers: 1200,
      following: 834,
      isWalletConnected: false,
    },
    "2": {
      id: "2",
      name: "Aurora Synth",
      walletAddress: "0x5678...9abc",
      avatar: "/assets/user-avatar.jpg", 
      isVerified: true,
      followers: "25.8K",
      following: "1.2K",
    }
  };
  
  export const nftData = {
    "1": [
      {
        id: "1",
        title: "Liquid Dreams",
        artist: "Aurora Synth",
        cover: "/assets/album-1.jpg", 
        owned: "Creator",
        earnings: "12.5 SUI",
      },
      {
        id: "2",
        title: "Digital Flow",
        artist: "Aurora Synth",
        cover: "/assets/album-2.jpg", 
        owned: "Creator",
        earnings: "8.3 SUI",
      }
    ],
    "2": [
      {
        id: "3",
        title: "Ethereal Mist",
        artist: "Aurora Synth",
        cover: "/assets/album-3.jpg", 
        owned: "Creator",
        earnings: "15.7 SUI",
      }
    ]
  };
  
export const revenueData = {
    
   "1": [
  {
    title: "Liquid Dreams",
    vaultRevenue: "45.2 SUI",
    yieldEarned: "5.8 SUI",
    daoSupport: "87%",
    protocol: "Aave",
    withdrawable: "2.1 SUI",
  },
  {
    title: "Cosmic Waves",
    vaultRevenue: "32.1 SUI",
    yieldEarned: "4.2 SUI",
    daoSupport: "92%",
    protocol: "Cetus",
    withdrawable: "1.8 SUI",
  },
]};

export const likedSongs = {
    "1": [
      {
      id: "1",
      title: "Sunflower",
      artist: "Post Malone",
      cover: "https://i.scdn.co/image/ab67616d0000b2737a4b3c9bc06e3a2b4cf4c58b"
      
    },
    {
      id: "2",
      title: "Blinding Lights",
      artist: "The Weeknd",
      cover: "https://i.scdn.co/image/ab67616d0000b273a3d4a5c3eb79b6dc5ed28d44"
    },
    
  ],
  "2": [
      {
      id: "1",
      title: "Sunflower",
      artist: "Post Malone",
      cover: "https://i.scdn.co/image/ab67616d0000b2737a4b3c9bc06e3a2b4cf4c58b"
      
    },
    {
      id: "2",
      title: "Blinding Lights",
      artist: "The Weeknd",
      cover: "https://i.scdn.co/image/ab67616d0000b273a3d4a5c3eb79b6dc5ed28d44"
    },
  ]
};

// followingData.js

export const followingData = {
  "1": [
    {
      id: "creator1",
      name: "Ariana Beats",
      genre: "Pop",
      avatar: "https://i.scdn.co/image/ab6761610000e5eb7a8c1a0b4a3f78f0e7643e3e"
    },
    {
      id: "creator2",
      name: "DJ Sonic",
      genre: "Electronic",
      avatar: "https://i.scdn.co/image/ab6761610000e5eb2f7a1e3d1c3d0b12345a6b7e"
    }
  ],
  "2": [
    {
      id: "creator3",
      name: "Melody Maker",
      genre: "Indie",
      avatar: "https://i.scdn.co/image/ab6761610000e5eb8c4c7b2d1234f3abc0987654"
    }
  ],
  "3": [] // No followings yet
};

export const vaultStats = {
  "1": [
    {
      title: "ETH Vault",
      vaultRevenue: "$4,200",
      yieldEarned: "$900",
      daoSupport: "$300",
      protocol: "Aave"
    },
    {
      title: "USDC Vault",
      vaultRevenue: "$2,800",
      yieldEarned: "$650",
      daoSupport: "$200",
      protocol: "Compound"
    },
    {
      title: "BTC Vault",
      vaultRevenue: "$3,500",
      yieldEarned: "$750",
      daoSupport: "$250",
      protocol: "Yearn"
    }
  ],
  "user456": [
    {
      title: "DAI Vault",
      vaultRevenue: "$1,500",
      yieldEarned: "$400",
      daoSupport: "$100",
      protocol: "Curve"
    }
  ]
};

