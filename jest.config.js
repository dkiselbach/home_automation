module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  globals: {
    'js-jest': {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  // globalSetup: '<rootDir>/test/global_setup.js',
  // globalTeardown: '<rootDir>/test/global_teardown.js',
};
