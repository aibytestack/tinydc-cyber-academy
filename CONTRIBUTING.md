# Contributing to Tiny DC Cyber Academy

## How to Author a New Technical Track or Lesson
Each technical track conforms to the `Track` interface defined in `src/types/academy.ts`.

### Lesson Structure Checklist
1. `id`: Unique lowercase slug (e.g. `py-03`, `rs-02`).
2. `briefing`: Clear technical summary of what will be accomplished.
3. `objectives`: Array of 2-4 concrete skills.
4. `conceptExplanation`: Plain-English explanation defining terminology.
5. `realWorldAnalogy`: Intuitive physical or operations analogy.
6. `demonstrationCode` & `demonstrationExplanation`: Working reference example.
7. `guidedExercisePrompt`: Precise challenge requirement.
8. `starterCode` & `solutionCode`: Initial template and verified reference solution.
9. `testCases`: Public and hidden evaluation assertions.
10. `troubleshootingTips`: Common failure modes and how to resolve them.
11. `knowledgeCheck`: Multiple choice questions with feedback explanations.
12. `realWorldApplication`: Production relevance to DevOps, AI, or SRE systems.

### Testing Requirements
Always run unit tests before submitting:
```bash
npx --yes tsx --test src/utils/*.test.ts
npm run build
```
