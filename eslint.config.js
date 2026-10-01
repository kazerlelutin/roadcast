import js from "@eslint/js";
import solid from "eslint-plugin-solid";
import typescriptParser from "@typescript-eslint/parser";
export default [js.configs.recommended, { files: ["**/*.{ts,tsx}"], languageOptions: { parser: typescriptParser, parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } }, globals: { Bun: "readonly", crypto: "readonly", document: "readonly", HTMLElement: "readonly", HTMLInputElement: "readonly", process: "readonly", SubmitEvent: "readonly" } }, plugins: { solid }, rules: { ...solid.configs.typescript.rules, "no-unused-vars": "off", "solid/prefer-for": "off", "solid/reactivity": "off" } }];
