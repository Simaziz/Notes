// eslint.config.mjs (for ES module)
export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    ignores: ["node_modules", "dist", ".next"], // Ignore build and dependency folders
  },
  {
    extends: ["next/core-web-vitals"],
  },
];
