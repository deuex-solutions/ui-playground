module.exports = {
  // Working directory
  roots: ["<rootDir>/src"],

  // Test files
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"], // All test files in subdirectories under src

  // Test coverage
  coverageDirectory: "<rootDir>/src/test/unit/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}", // All files in subdirectories under src
    "!<rootDir>/src/utils/material-ui/**", // Exclude Material-UI theme files
    "!<rootDir>/node_modules/", // Exclude node modules
  ],

  // TypeScript
  preset: "ts-jest",

  // Test Environment
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  clearMocks: true,
  moduleDirectories: ["src", "node_modules"],

  // moduleNameMapper: {
  //     "\\.(svg|ttf)": "<rootDir>/src/test/unit/mocks/svg.mock.js", // Mock SVG imports
  //     "\\.(css|scss)$": "identity-obj-proxy", // Mock style imports
  // },
};
