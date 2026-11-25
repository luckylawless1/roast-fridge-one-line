// One Line, One Laugh: Roast Your Fridge
// Entry program for make.fun bounty u-suzy-one-line-one-laugh-roast-your-fridge-f1063521.
// Writes exactly one roast line (<=200 chars, single line) to /output/entry.txt.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ROAST =
  "My fridge hums all night over three expired sauces and one brave little carrot, like a nightclub bouncer guarding a VIP list nobody's on.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and a single line. Validate before writing so a bad line can
// never be submitted.
if (ROAST.length < 1 || ROAST.length > 200) {
  throw new Error(`Roast is ${ROAST.length} chars; gate requires 1-200.`);
}
if (ROAST.trim().length === 0 || ROAST.includes("\n")) {
  throw new Error("Roast must be a single non-blank line.");
}

// Never remove the /output root itself (the grader mounts it): clear only
// its contents, then recreate it.
mkdirSync("/output", { recursive: true });
for (const name of ["entry.txt"]) {
  try {
    rmSync(`/output/${name}`, { force: true });
  } catch {
    // A stale entry from another builder is fine to leave behind only if
    // the write below succeeds; removal failure is non-fatal here.
  }
}
writeFileSync("/output/entry.txt", ROAST + "\n", "utf8");
// Read back and verify byte-for-byte: what the grader sees must be exactly
// the validated line, so a shared /output or a partial write cannot slip
// through silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ROAST + "\n") {
  throw new Error("Verification failed: /output/entry.txt does not match the roast.");
}
console.log(`Wrote ${ROAST.length}-char roast to /output/entry.txt`);
