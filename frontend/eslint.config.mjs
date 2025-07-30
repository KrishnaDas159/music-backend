import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Allow use of 'any' in TypeScript
      "@typescript-eslint/no-explicit-any": "off",

      // Allow unused variables (you can also set to "warn" instead of "off")
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // Optional: disable other strict TS rules you might want to ignore
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];

export default eslintConfig;
s