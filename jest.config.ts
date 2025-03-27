/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  // coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
  moduleNameMapper: {
    "@/server": "<rootDir>/src/server/_DATA.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svg-mock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
};

export default config;
