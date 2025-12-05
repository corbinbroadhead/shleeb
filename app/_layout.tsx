import { BuzzerProvider } from "@/contexts/buzzerContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {

  return (
    <BuzzerProvider>
      <StatusBar style="light" /> 
      <Stack
        screenOptions={{
          headerShown: false,
        }}/>
    </BuzzerProvider>
  )
}
