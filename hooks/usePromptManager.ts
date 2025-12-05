import { PromptSet } from "@/data/promptSets";
import { useState } from "react";

export function usePromptManager(promptSet: PromptSet | null) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPrompt = promptSet?.prompts[currentIndex] || null;
  const isLastPrompt = promptSet ? currentIndex >= promptSet.prompts.length - 1 : false;
  const promptNumber = currentIndex + 1;
  const totalPrompts = promptSet?.prompts.length || 0;

  function nextPrompt() {
    if (!promptSet) return false;
    
    if (currentIndex < promptSet.prompts.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return true; // More prompts remain
    }
    return false; // No more prompts (should end game)
  }

  function reset() {
    setCurrentIndex(0);
  }

  return {
    currentPrompt,
    isLastPrompt,
    nextPrompt,
    reset,
    promptNumber,
    totalPrompts,
  };
}