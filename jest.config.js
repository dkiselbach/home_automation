import { defaults } from 'jest-config';

export default {
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  globals: {
    'js-jest': {
      diagnostics: false,
    },
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // globalSetup: '<rootDir>/test/global_setup.js',
  // globalTeardown: '<rootDir>/test/global_teardown.js',
};
