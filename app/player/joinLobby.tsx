import JoinFormView from "@/components/screen_renders/JoinFormView";
import WaitingLobbyView from "@/components/screen_renders/WaitingLobbyView";
import { useJoinForm } from "@/hooks/useJoinForm";
import { usePlayerGame } from "@/hooks/usePlayerGame";

export default function JoinLobby() {
  const { joinGame, loading } = usePlayerGame();
  const form = useJoinForm(joinGame);

  if (form.hasJoined) {
    return <WaitingLobbyView playerName={form.name} />;
  }

  return (
    <JoinFormView
      name={form.name}
      error={form.error}
      loading={loading}
      onNameChange={form.setName}
      onSubmit={form.submit}
    />
  );
}