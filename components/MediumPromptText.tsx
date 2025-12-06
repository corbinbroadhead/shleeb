import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface MediumPromptTextProps extends TextProps {
  children: React.ReactNode;
}

export default function MediumPromptText({ children, style, ...props }: MediumPromptTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#7C3AED",
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 32,
  },
});
