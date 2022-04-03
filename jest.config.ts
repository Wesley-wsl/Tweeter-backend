export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
    coverageProvider: "v8",
    preset: "ts-jest",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
