import { useState } from "react";

export function useJoinForm(joinGame: (name: string) => Promise<any>) {
  const [name, setName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null)

  async function submit() {
    if (!name) {
      setError("Name is required.");
      return;
    }

    const result = await joinGame(name);
    if (!result.success) {
      if (result.error?.message?.includes("players_name_unique")) {
        setError("That username is taken.");
        return;
      }
      setError("Failed to join game.");
      return;
    }

    setPlayerId(result.id)
    setHasJoined(true);
  }

  return {
    name,
    setName,
    error,
    hasJoined,
    submit,
    playerId,
  };
}
