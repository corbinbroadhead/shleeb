// contexts/playerContext.tsx
import { supabase } from "@/utils/supabase";
import React, { createContext, ReactNode, useContext, useState } from "react";


interface Player {
  id: string | null;
  name: string;
  avatarId: number; 
}

interface PlayerContextValue {
  player: Player;
  setPlayer: (player: Player) => void;
  updatePlayerName: (name: string) => void;
  updatePlayerAvatar: (avatarId: number) => void;
  updatePlayerId: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player>({
    id: null,
    name: "",
    avatarId: 0, // Default to first avatar
  });

  const updatePlayerName = (name: string) => {
    setPlayer((prev) => ({ ...prev, name }));
  };

  const updatePlayerAvatar = async (avatarId: number) => {
    setPlayer((prev) => ({ ...prev, avatarId }));
    
    // Save to database if player has joined
    if (player.id) {
      try {
          await supabase
          .from("players")
          .update({ avatar_id: avatarId })
          .eq("id", player.id);
        
      } catch (err) {
        console.error("[player] Failed to update avatar:", err);
      }
    }
  };

  const updatePlayerId = (id: string) => {
    setPlayer((prev) => ({ ...prev, id }));
  };

  return (
    <PlayerContext.Provider
      value={{ player, setPlayer, updatePlayerName, updatePlayerAvatar, updatePlayerId }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};