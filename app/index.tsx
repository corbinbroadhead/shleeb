import StandardButton from "@/components/StandardButton";
import TitleBar from "@/components/TitleBar";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View>
      <View style={{height: 100}}>
        <TitleBar title="shleeb"></TitleBar>
      </View>
      <ScrollView
      contentContainerStyle={{
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
    </View>
  );
}