import { defaults } from 'jest-config';

export default {
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    // 'ts-jest': {
    //   //... // your other configurations here
    //   useESM: true,
    // },
    'js-jest': {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // globalSetup: '<rootDir>/test/global_setup.js',
  // globalTeardown: '<rootDir>/test/global_teardown.js',
};
