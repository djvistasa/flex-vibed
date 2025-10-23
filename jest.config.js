export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@hooks/(.*)$": "<rootDir>/src/common/hooks/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          baseUrl: ".",
          paths: {
            "@common/*": ["src/common/*"],
            "@features/*": ["src/features/*"],
            "@hooks/*": ["src/common/hooks/*"],
          },
        },
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
};
