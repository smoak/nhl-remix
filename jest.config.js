/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.ts(x)",
    "api/**/*.(t|j)sx?$",
    "!app/root.tsx",
    "!app/entry.client.tsx",
    "!app/entry.server.tsx",
    "!app/routes/**/*.tsx",
    "!app/**/stories.tsx",
  ],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", ".cache/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
};
