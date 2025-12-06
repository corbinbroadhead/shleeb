// components/screen_renders/NextPromptLoadingView.tsx
import { Text, View } from "react-native";

export default function NextPromptLoadingView() {
  return (
    <View style={{ marginTop: 80, alignItems: "center" }}>
      <Text style={{ fontSize: 28 }}>Next prompt incoming...</Text>
    </View>
  );
}