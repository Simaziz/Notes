const eslintConfig = [
  {
    ignores: ["node_modules", "dist", ".next"], // Ignore build and dependency folders
  },
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
    extends: "next/core-web-vitals",
  },
];

export default eslintConfig;
