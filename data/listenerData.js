// backend/data/listenerData.js
export const listeners = {
    "1": {
      id: "1",
      name: "Alex Chen",
      walletAddress: "0x1234...5678",
      avatar: "/assets/user-avatar.jpg",
      followers: 1200,
      followingCount: 834,
      isWalletConnected: false,
    },
    "2": {
      id: "2",
      name: "Sara Kim",
      walletAddress: "0xABCD...EFGH",
      avatar: "/assets/user-avatar2.jpg",
      followers: 980,
      followingCount: 412,
      isWalletConnected: true,
    }
  };
  
  export const nftData = {
    "1": [
      {
        id: "1",
        title: "Liquid Dreams",
        artist: "Aurora Synth",
        cover: "/assets/album-1.jpg",
        owned: 5,
        earnings: "0.25 SUI",
        daoVoting: true
      },
      {
        id: "2",
        title: "Neon Mirage",
        artist: "Digital Bloom",
        cover: "/assets/album-2.jpg",
        owned: 2,
        earnings: "0.10 SUI",
        daoVoting: false
      }
    ],
    "2": [
      {
        id: "3",
        title: "Echoes of Light",
        artist: "Nova Pulse",
        cover: "/assets/album-3.jpg",
        owned: 3,
        earnings: "0.15 SUI",
        daoVoting: true
      }
    ]
  };
  
  export const vaultStats = {
    "1": [
      {
        title: "Liquid Dreams",
        invested: "2.5 SUI",
        tvl: "125.8 SUI",
        apr: "18.2%",
        withdrawable: "0.31 SUI"
      },
      {
        title: "Neon Mirage",
        invested: "1.0 SUI",
        tvl: "80.2 SUI",
        apr: "14.5%",
        withdrawable: "0.15 SUI"
      }
    ],
    "2": [
      {
        title: "Echoes of Light",
        invested: "1.2 SUI",
        tvl: "92.3 SUI",
        apr: "16.8%",
        withdrawable: "0.21 SUI"
      }
    ]
  };
  
  export const likedSongs = {
    "1": ["song1", "song3", "song5"],
    "2": ["song2", "song4"]
  };
  
  export const following = {
    "1": ["artist1", "artist2"],
    "2": ["artist3"]
  };
  