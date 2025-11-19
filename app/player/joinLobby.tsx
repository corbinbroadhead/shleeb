import Buzzer from "@/components/Buzzer";
import PlayerTitleBar from "@/components/PlayerTitleBar";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import { useJoinForm } from "../../hooks/useJoinForm";
import { usePlayerGame } from "../../hooks/usePlayerGame";

export default function JoinLobby() {
  const { joinGame, buzz, loading, playerId } = usePlayerGame();
  const form = useJoinForm(joinGame);
  const title = "Welcome, "+form.name+"!";
  if (form.hasJoined) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          Welcome, {form.name}!
        </Text>
        <PlayerTitleBar title={title}></PlayerTitleBar>
        <View style={{height: 300, width: 300, alignItems: "center"}}>
          <Buzzer text="Press to Buzz!" onClick={buzz} />
        </View>

        {/*{playerId && (
          <Text style={{ marginTop: 20, opacity: 0.5 }}>
            Player ID: {playerId}
          </Text>
        )} */}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Join the Lobby
      </Text>

      <TextInput
        placeholder="Enter your name"
        autoCapitalize="none"
        value={form.name}
        onChangeText={form.setName}
        style={{
          width: "100%",
          padding: 12,
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      {form.error && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {form.error}
        </Text>
      )}

      <Button
        title={loading ? "Joining..." : "Join Game"}
        disabled={loading}
        onPress={form.submit}
      />
    </ScrollView>
  );
}
