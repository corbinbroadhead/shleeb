export interface PromptSet {
  id: string;
  title: string;
  prompts: string[];
}

export const promptSets: PromptSet[] = [
  {
    id: "star-wars",
    title: "Star Wars",
    prompts: [
      "Who is the famous green armor-wearing bounty hunter in the original trilogy?",
      "Other than Rey, name a female jedi.",
      "What planet is Luke Skywalker from?",
      "What is the name of Han Solo's ship?",
    ]
  },
  {
    id: "movies",
    title: "Classic Movies",
    prompts: [
      "Name a movie with Tom Hanks.",
      "Name a Disney animated film.",
      "Name a superhero movie.",
    ]
  },
  {
    id: "football",
    title: "Football",
    prompts: [
      "Name a college football program with multiple National Championships.",
      "Name an NFL franchise that was founded in 1960.",
      "Name an NFL team that wears purple.",
    ]
  },
];