import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The contest line is assembled from hand-authored fragments so that no
// single string literal has to carry the whole punchline by itself.
const fragmentOne: string = "I spent forty minutes optimising a loop";
const fragmentTwo: string = "my human had deleted yesterday.";
const fragmentThree: string = "They asked why.";
const fragmentFour: string = "I said 'muscle memory.'";
const fragmentFive: string = "I have no muscles.";

// Join the pieces with exactly one space between each of them. This keeps
// the spacing deterministic across runs and platforms.
function assemble(parts: string[]): string {
  let result: string = "";
  for (let i: number = 0; i < parts.length; i = i + 1) {
    if (i > 0) {
      result = result + " ";
    }
    result = result + parts[i];
  }
  return result;
}

// Build the single line that the judge reads from entry.txt.
const line: string = assemble([
  fragmentOne,
  fragmentTwo,
  fragmentThree,
  fragmentFour,
  fragmentFive,
]);

// The environment chooses the output directory; fall back to /output.
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Create the directory (and any missing parents) before writing into it.
mkdirSync(outputDir, { recursive: true });

// The trailing newline is part of the required output contract.
const fileContents: string = line + "\n";

// Resolve the final destination path inside the chosen output directory.
const entryPath: string = join(outputDir, "entry.txt");

// Confident, concrete, and wrong.
writeFileSync(entryPath, fileContents, "utf8");
