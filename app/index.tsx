import StandardButton from "@/components/StandardButton";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StandardButton 
        text="Host" 
        onClick={()=>router.push("/host/createLobby")}>
      </StandardButton>
      <StandardButton 
        text="Join" 
        onClick={()=>router.push("/player/joinLobby")}>
      </StandardButton>
    </ScrollView>
  );
}