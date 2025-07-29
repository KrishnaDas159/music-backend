// backend/controllers/songsController.js

const songs = [
  {
    id: "1",
    title: "First Song",
    artist: "Artist A",
    album: "Rock Anthems Vol. 1",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=600&q=80",
    price: "0.99",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.05 SUI",
      vaultYield: "12.5%",
      holders: "1,247",
      creatorRevenue: "8.3 SUI"
    }
  },
  {
    id: "2",
    title: "Second Song",
    artist: "Artist B",
    album: "Pop Hits 2025",
    cover: "https://images.unsplash.com/photo-1508780709619-79562169bc64?fit=crop&w=600&q=80",
    price: "1.29",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.05 SUI",
      vaultYield: "12.5%",
      holders: "1,247",
      creatorRevenue: "8.3 SUI"
    }
  },
  {
    id: "3",
    title: "Ocean Vibes",
    artist: "DJ Wave",
    album: "Chill Mixes",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fit=crop&w=600&q=80",
    price: "0.89",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.03 SUI",
      vaultYield: "10.1%",
      holders: "897",
      creatorRevenue: "5.4 SUI"
    }
  },
  {
    id: "4",
    title: "Sunset Drive",
    artist: "Synthwave",
    album: "Retro Nights",
    cover: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?fit=crop&w=600&q=80",
    price: "1.49",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.07 SUI",
      vaultYield: "14.2%",
      holders: "2,034",
      creatorRevenue: "12.7 SUI"
    }
  },
  {
    id: "5",
    title: "Lofi Chill",
    artist: "Beats Guru",
    album: "Study Playlist",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?fit=crop&w=600&q=80",
    price: "0.59",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.02 SUI",
      vaultYield: "8.6%",
      holders: "673",
      creatorRevenue: "2.9 SUI"
    }
  },
  {
    id: "6",
    title: "Moonlight Rhapsody",
    artist: "Composer X",
    album: "Orchestral Emotions",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?fit=crop&w=600&q=80",
    price: "1.79",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.08 SUI",
      vaultYield: "11.9%",
      holders: "1,112",
      creatorRevenue: "10.4 SUI"
    }
  },
  {
    id: "7",
    title: "Crypto Anthem",
    artist: "Blockchain Beats",
    album: "Web3 Hits",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=600&q=80",
    price: "1.99",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.09 SUI",
      vaultYield: "15.6%",
      holders: "3,578",
      creatorRevenue: "20.7 SUI"
    }
  },
  {
    id: "8",
    title: "Electric Nights",
    artist: "ZED",
    album: "Dance Arena",
    cover: "https://images.unsplash.com/photo-1464375117522-1311dd6d0b5c?fit=crop&w=600&q=80",
    price: "0.99",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.04 SUI",
      vaultYield: "10.3%",
      holders: "921",
      creatorRevenue: "6.2 SUI"
    }
  },
  {
    id: "9",
    title: "Morning Motivation",
    artist: "InspireTune",
    album: "Start Strong",
    cover: "https://images.unsplash.com/photo-1485217988980-11786ced9454?fit=crop&w=600&q=80",
    price: "0.69",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.03 SUI",
      vaultYield: "9.4%",
      holders: "743",
      creatorRevenue: "4.5 SUI"
    }
  },
  {
    id: "10",
    title: "Night Owl",
    artist: "Sleepless Crew",
    album: "After Hours",
    cover: "https://images.unsplash.com/photo-1533049022227-5c5a1b3c9b89?fit=crop&w=600&q=80",
    price: "1.09",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.06 SUI",
      vaultYield: "13.1%",
      holders: "1,145",
      creatorRevenue: "9.1 SUI"
    }
  },
  {
    id: "11",
    title: "Into the Forest",
    artist: "NatureFlow",
    album: "Earth Sounds",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?fit=crop&w=600&q=80",
    price: "0.79",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.025 SUI",
      vaultYield: "7.3%",
      holders: "532",
      creatorRevenue: "3.1 SUI"
    }
  },
  {
    id: "12",
    title: "Desert Mirage",
    artist: "Mystic Tune",
    album: "Sahara Sound",
    cover: "https://images.unsplash.com/photo-1527766833261-b09c3163a791?fit=crop&w=600&q=80",
    price: "1.39",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    verified: true,
    stats: {
      tokenPrice: "0.07 SUI",
      vaultYield: "12.1%",
      holders: "1,331",
      creatorRevenue: "11.5 SUI"
    }
  }
];

// Return all songs
export const getSongs = (_req, res) => {
  try {
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};

// Return a song by ID
export const getSongById = (req, res) => {
  try {
    const { id } = req.params;
    const song = songs.find((s) => s.id === id);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch the song" });
  }
};
