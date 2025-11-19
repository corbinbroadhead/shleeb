import { useState } from "react";

export function useJoinForm(joinGame: (name: string) => Promise<any>) {
  const [name, setName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name) {
      setError("Name is required.");
      return;
    }

    const result = await joinGame(name);

    if (!result.success) {
      setError("Failed to join game.");
      return;
    }

    setHasJoined(true);
  }

  return {
    name,
    setName,
    error,
    hasJoined,
    submit,
  };
}
