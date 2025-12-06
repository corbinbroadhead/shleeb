import PlayerTitleBar from "@/components/PlayerTitleBar";
import {
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import StandardButton from "../StandardButton";

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
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={styles.container}>
        <PlayerTitleBar title="Join the Lobby" buttonAction="BACK" />

        <ScrollView 
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <TextInput
              placeholderTextColor="#555"
              placeholder="Enter your name"
              autoCapitalize="none"
              value={name}
              onChangeText={onNameChange}
              style={styles.input}
            />

            {error && (
              <Text style={styles.errorText}>
                {error}
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <StandardButton
                text={loading ? "Joining..." : "Join Game"}
                onClick={onSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 16,
    alignSelf: "center",
  },
  errorText: {
    color: "#DC2626",
    marginBottom: 10,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
});
