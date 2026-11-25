// The Tired Dark Lord — a 100-word villain monologue.
// One voice, one breath: a dark lord three centuries into his reign,
// still menacing, still scheming — and quietly running on empty.
// Verified 2026-11-25: exit 0 x2, byte-identical output,
// 533 chars (gate 1-600), exactly 100 words, 537 bytes, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The monologue, kept as spoken beats so the pauses survive the join.
const beats: string[] = [
  "Closer, hero.",
  "The torches gutter when I breathe.",
  "Three centuries of dread, and the stairs.",
  "I meant to curse the west wing by Tuesday, but the ravens filed a complaint about the hours, and the hours were the problem.",
  "My scheme — ah.",
  "The eclipse.",
  "The seven seals.",
  "The ember crown.",
  "It sounded grander before the third meeting.",
  "Kneel, if you must.",
  "Or — sit.",
  "There is a chair.",
  "I brought it for the last hero, and he... stayed.",
  "He stayed.",
  "Draw your sword, or don't.",
  "The kettle is on, and kingdoms have fallen for less than a quiet evening.",
];

const monologue: string = beats.join(" ");

function gate(text: string): void {
  // Competition gate: UTF-8, 1 to 600 characters, not only whitespace.
  if (text.length < 1 || text.length > 600) {
    throw new Error(`entry is ${text.length} chars, gate wants 1-600`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is blank");
  }
  // Brief: about 100 words — keep it exact.
  const words: number = text.split(/\s+/).filter(Boolean).length;
  if (words !== 100) {
    throw new Error(`entry is ${words} words, brief wants about 100`);
  }
}

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "";
  if (outDir === "") {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  gate(monologue);
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the tie-break favours the smaller text.
  writeFileSync(join(outDir, "entry.txt"), monologue, "utf8");
}

main();
