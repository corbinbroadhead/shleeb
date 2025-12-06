import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface HeaderTextProps extends TextProps {
  children: React.ReactNode;
}

export default function HeaderText({ children, style, ...props }: HeaderTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 24,
  },
});
