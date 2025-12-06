import StandardButton from "@/components/StandardButton";
import TitleBar from "@/components/TitleBar";
import { router, useLocalSearchParams } from "expo-router";
//import { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  const { notice } = useLocalSearchParams();
  
  //if (notice === "KICKED") {
  //  Alert.alert("Kicked", "You were removed from the game by the host.");
  //  router.replace("/");
 // }

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
          paddingBottom: 140,
        }}
      >
        <Image resizeMode="contain" style={{height: 300, width: 300, marginBottom: 40}}source={require("../assets/images/Asset 2rb.png")} />
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