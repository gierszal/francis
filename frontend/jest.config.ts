import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",

  testEnvironment: "jsdom",

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  //   transformIgnorePatterns: [
  //     "/node_modules/(?!(next-intl|use-intl|@formatjs)/)",
  //   ],
  resolver: "ts-jest-resolver",
};

export default config;
