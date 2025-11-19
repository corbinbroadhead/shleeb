import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

type Props = {
  title: string;
  backgroundColor?: string;
};

export default function PlayerTitleBar({
  title,
  backgroundColor = "#fff",
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.left}>
        <IconButton icon={<Entypo name="cross" size={32} color="white" />} size={32} onClick={()=>router.back()}></IconButton>
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Spacer to balance the layout so title is centered */}
      <View style={styles.right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
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
  },
});
