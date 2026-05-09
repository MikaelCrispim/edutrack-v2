module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.cjs',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
  },
};
