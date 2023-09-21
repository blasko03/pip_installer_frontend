module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      'plugin:react/recommended',
      'standard-with-typescript',
      'plugin:react/jsx-runtime',
      "plugin:react/recommended",
      "next/core-web-vitals"
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json']
    },
    rules: {
    },
    plugins: [
      "react"
    ],
    settings: {
      react: {
        version: "detect"
      }
    },
    ignorePatterns: ['node_modules', 'dist']
  }