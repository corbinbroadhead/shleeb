import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  backgroundColor?: string;
};

export default function TitleBar({
  title,
  backgroundColor = "#7C3AED",
}: Props) {

  return (
    <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});