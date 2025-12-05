import { BuzzerProvider } from "@/contexts/buzzerContext";
import { PlayerProvider } from "@/contexts/playerContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {

  return (
    <BuzzerProvider>
      <PlayerProvider>
        <StatusBar style="light" /> 
        <Stack
          screenOptions={{
            headerShown: false,
          }}/>
      </PlayerProvider>
    </BuzzerProvider>
  )
}
