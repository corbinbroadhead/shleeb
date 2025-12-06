import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface JoinedPlayerNameTextProps extends TextProps {
  children: React.ReactNode;
}

export default function JoinedPlayerNameText({ children, style, ...props }: JoinedPlayerNameTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.8,
    lineHeight: 20,
  },
});
