import { usePlayer } from '@/contexts/playerContext';
import { usePlayerGame } from '@/hooks/usePlayerGame';
import { FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

type Props = {
  title: string;
  backgroundColor?: string;
  buttonAction?: "EXIT" | "BACK";
};

export default function PlayerTitleBar({
  title,
  backgroundColor = "purple",
  buttonAction = "EXIT",
}: Props) {
  const { player } = usePlayer();
  const icon =
    buttonAction === "BACK" ? (
      <FontAwesome5 name="chevron-circle-left" size={32} color="purple" />
    ) : (
      <Entypo name="cross" size={32} color="white" />
    );
  const buttonBackgroundColor = buttonAction === "BACK" ? "white" : "red"
  const showConfirmation = buttonAction === "BACK" ? false : true;
  const confirmationMessage = showConfirmation ? "Exit the lobby?" : ""
  const { leave } = usePlayerGame();
  function handleOnClick() {
    leave();
    router.back();
  };
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.left}>
        <IconButton
          icon={icon}
          size={32}
          onClick={handleOnClick}
          backgroundColor={buttonBackgroundColor}
          showConfirmation={showConfirmation}
          actionMessage={confirmationMessage}
        />
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Spacer to keep title centered */}
      <View style={styles.right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  left: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
});
