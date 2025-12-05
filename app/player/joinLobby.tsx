import PlayerTitleBar from "@/components/PlayerTitleBar";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import { useJoinForm } from "../../hooks/useJoinForm";
import { usePlayerGame } from "../../hooks/usePlayerGame";

export default function JoinLobby() {
  const { joinGame, playerId, loading } = usePlayerGame();
  const form = useJoinForm(joinGame);
  const title = "Welcome, "+form.name+"!";

  if (form.hasJoined) {
    return (
      <View>
        <PlayerTitleBar title={title}></PlayerTitleBar>
        <ScrollView contentContainerStyle={{width: "100%", height: "100%", alignItems: "center"}}>
          <View style={{height: 300, width: 300, alignItems: "center"}}>
            {/*<Buzzer text="Press to Buzz!" onClick={buzz} />*/}
            <Text>Waiting for host to start game...</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <PlayerTitleBar title="Join the Lobby" buttonAction="BACK"></PlayerTitleBar>
      <ScrollView contentContainerStyle={{width: "100%", height: "100%"}}>
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
    </View>
  );
}
