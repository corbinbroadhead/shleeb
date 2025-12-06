// components/screen_renders/NextPromptLoadingView.tsx
import { View } from "react-native";
import LargePromptText from "../LargePromptText";

export default function NextPromptLoadingView() {
  return (
    <View style={{ marginTop: 80, alignItems: "center" }}>
      <LargePromptText>Next prompt incoming...</LargePromptText>
    </View>
  );
}