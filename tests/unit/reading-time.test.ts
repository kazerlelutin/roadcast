import { expect, test } from "bun:test";
import { estimateChronicleMinutes } from "../../src/features/chronicle/reading-time.ctrl";
test("estime une minute pour un texte court", () => expect(estimateChronicleMinutes("Bonjour monde")).toBe(1));
test("arrondit au-dessus de 150 mots", () => expect(estimateChronicleMinutes(Array(151).fill("mot").join(" "))).toBe(2));
