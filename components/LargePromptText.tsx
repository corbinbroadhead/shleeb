import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface LargePromptTextProps extends TextProps {
  children: React.ReactNode;
}

export default function LargePromptText({ children, style, ...props }: LargePromptTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#7C3AED",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 32,
  },
});
