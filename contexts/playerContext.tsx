import React, { createContext, ReactNode, useContext, useState } from "react";

interface Player {
  id: string | null;
  name: string;
  imageUrl: string | null;
}

interface PlayerContextValue {
  player: Player;
  setPlayer: (player: Player) => void;
  updatePlayerName: (name: string) => void;
  updatePlayerImage: (imageUrl: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player>({
    id: null,
    name: "",
    imageUrl: null,
  });

  const updatePlayerName = (name: string) => {
    setPlayer((prev) => ({ ...prev, name }));
  };

  const updatePlayerImage = (imageUrl: string) => {
    setPlayer((prev) => ({ ...prev, imageUrl }));
  };

  return (
    <PlayerContext.Provider
      value={{ player, setPlayer, updatePlayerName, updatePlayerImage }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook for convenience
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
