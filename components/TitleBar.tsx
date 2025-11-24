import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  backgroundColor?: string;
};

export default function TitleBar({
  title,
  backgroundColor = "purple",
}: Props) {

  return (
    <View style={[styles.container, { backgroundColor }, styles.center]}>
        <Text style={styles.title}>{title}</Text>
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
  center: {
    paddingLeft: 155,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
});
