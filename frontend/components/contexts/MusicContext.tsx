
'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  price?: string;
  url?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  setCurrentSong: (song: Song) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlaylist: (songs: Song[]) => void;
  seek: (time: number) => void; 
}

const MusicContext = createContext<MusicContextType>({} as MusicContextType);

export const useMusicPlayer = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSongState] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    if (currentSong?.url) {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = currentSong.url;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.ontimeupdate = () => {
        setProgress(audioRef.current!.currentTime);
        setDuration(audioRef.current!.duration || 0);
      };

      audioRef.current.onended = () => {
        playNext();
      };
    }
  }, [currentSong]);

  const setCurrentSong = (song: Song) => {
    const index = playlist.findIndex((s) => s.id === song.id);
    setCurrentIndex(index);
    setCurrentSongState(song);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSongState(playlist[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongState(playlist[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        setCurrentSong,
        togglePlayPause,
        playNext,
        playPrevious,
        setPlaylist,
        seek, 
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};