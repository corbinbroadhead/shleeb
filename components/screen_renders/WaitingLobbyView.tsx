import AvatarPicker from "@/components/AvatarPicker";
import PlayerTitleBar from "@/components/PlayerTitleBar";
import { ScrollView, Text, View } from "react-native";

interface WaitingLobbyViewProps {
  playerName: string;
}

export default function WaitingLobbyView({ playerName }: WaitingLobbyViewProps) {
  const title = `Welcome, ${playerName}!`;

  return (
    <View>
      <PlayerTitleBar title={title} />
      <ScrollView 
        contentContainerStyle={{ 
          width: "100%", 
          height: "100%", 
          alignItems: "center" 
        }}
      >
        <View style={{ height: 300, width: 300, alignItems: "center" }}>
          <Text>Waiting for host to start game...</Text>
        </View>
        <AvatarPicker />
        <Text>Personalize your avatar while you wait!</Text>
      </ScrollView>
    </View>
  );
}