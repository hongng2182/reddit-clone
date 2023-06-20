module.exports = {
  env: {
    browser: true,
    node: true
  },
  root: true,
  settings: {
    next: {
      rootDir: ["src/*/"]
    }
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "next",
        "airbnb",
        "airbnb-typescript",
        "prettier"
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        "import/extensions": 0,
        "jsx-a11y/click-events-have-key-events": 'off',
        'jsx-a11y/no-static-element-interactions': 'off'
      }
    },
  ],
  rules: {
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
  ignorePatterns: ["src/**/*.test.ts", "src/generated/*"]
}
