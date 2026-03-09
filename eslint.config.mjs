// eslint.config.js
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["components/ui/**/*"],
  },

  // Base config for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // Custom rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "comma-dangle": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // TypeScript specific
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
];

// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import nextPlugin from "@next/eslint-plugin-next";
// import reactPlugin from "eslint-plugin-react";
// import reactHooksPlugin from "eslint-plugin-react-hooks";
// import importPlugin from "eslint-plugin-import";
// import typescriptParser from "@typescript-eslint/parser";
// import typescriptPlugin from "@typescript-eslint/eslint-plugin";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const config = [
//   {
//     ignores: ["components/ui/**/*"],
//   },

//   // This replaces everything from compat.extends()
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     languageOptions: {
//       parser: typescriptParser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       react: reactPlugin,
//       "react-hooks": reactHooksPlugin,
//       "@next/next": nextPlugin,
//       "@typescript-eslint": typescriptPlugin,
//       import: importPlugin,
//     },
//     rules: {
//       // From "next/core-web-vitals" and "next/typescript"
//       ...nextPlugin.configs.recommended.rules,
//       ...nextPlugin.configs["core-web-vitals"].rules,

//       // From "standard" (partial - most important ones)
//       "no-var": "error",
//       "prefer-const": "error",
//       "no-undef": "error",
//       "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
//       eqeqeq: ["error", "always"],

//       // From "prettier" (disables formatting rules)
//       "comma-dangle": "off",
//       semi: "off",
//       quotes: "off",
//       indent: "off",
//       "no-mixed-spaces-and-tabs": "off",

//       // React recommended rules (from standard's dependencies)
//       ...reactPlugin.configs.recommended.rules,
//       ...reactHooksPlugin.configs.recommended.rules,
//       "react/react-in-jsx-scope": "off", // Not needed in Next.js

//       // TypeScript recommended rules
//       ...typescriptPlugin.configs.recommended.rules,

//       // Your custom import/order rule
//       "import/order": [
//         "error",
//         {
//           groups: [
//             "builtin",
//             "external",
//             "internal",
//             ["parent", "sibling"],
//             "index",
//             "object",
//           ],
//           "newlines-between": "always",
//           pathGroups: [
//             {
//               pattern: "@app/**",
//               group: "external",
//               position: "after",
//             },
//           ],
//           pathGroupsExcludedImportTypes: ["builtin"],
//           alphabetize: {
//             order: "asc",
//             caseInsensitive: true,
//           },
//         },
//       ],
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//       "import/resolver": {
//         typescript: true,
//         node: true,
//       },
//     },
//   },

//   // TypeScript specific overrides
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     rules: {
//       "no-undef": "off", // TypeScript handles this
//     },
//   },
// ];

// export default config;
