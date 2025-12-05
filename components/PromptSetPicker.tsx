import { PromptSet, promptSets } from "@/data/promptSets";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface PromptSetPickerProps {
  selectedSet: PromptSet | null;
  onSelectSet: (set: PromptSet) => void;
}

export default function PromptSetPicker({ selectedSet, onSelectSet }: PromptSetPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prompt Set:</Text>
      
      {/* Dropdown button */}
      <Pressable
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.buttonText}>
          {selectedSet ? selectedSet.title : "Select a prompt set..."}
        </Text>
        <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
      </Pressable>

      {/* Dropdown options */}
      {isOpen && (
        <View style={styles.optionsContainer}>
          {promptSets.map((set) => (
            <Pressable
              key={set.id}
              style={[
                styles.option,
                selectedSet?.id === set.id && styles.selectedOption
              ]}
              onPress={() => {
                onSelectSet(set);
                setIsOpen(false);
              }}
            >
              <Text style={styles.optionText}>{set.title}</Text>
              <Text style={styles.optionSubtext}>
                {set.prompts.length} questions
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: "#666",
  },
  optionsContainer: {
    marginTop: 4,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 200,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});