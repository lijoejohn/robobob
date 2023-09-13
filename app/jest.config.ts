export default {
  collectCoverage: false,
  resetMocks: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less)$": "<rootDir>/src/__test__/testdata/CSSStub.js",
  },
};
