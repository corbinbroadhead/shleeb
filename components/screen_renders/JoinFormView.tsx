import PlayerTitleBar from "@/components/PlayerTitleBar";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

interface JoinFormViewProps {
  name: string;
  error: string | null;
  loading: boolean;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
}

export default function JoinFormView({ 
  name, 
  error, 
  loading, 
  onNameChange, 
  onSubmit 
}: JoinFormViewProps) {
  return (
    <View>
      <PlayerTitleBar title="Join the Lobby" buttonAction="BACK" />
      <ScrollView contentContainerStyle={{ width: "100%", height: "100%" }}>
        <TextInput
          placeholder="Enter your name"
          autoCapitalize="none"
          value={name}
          onChangeText={onNameChange}
          style={{
            width: "100%",
            padding: 12,
            borderWidth: 1,
            borderColor: "#999",
            borderRadius: 8,
            marginBottom: 10,
          }}
        />

        {error && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {error}
          </Text>
        )}

        <Button
          title={loading ? "Joining..." : "Join Game"}
          disabled={loading}
          onPress={onSubmit}
        />
      </ScrollView>
    </View>
  );
}