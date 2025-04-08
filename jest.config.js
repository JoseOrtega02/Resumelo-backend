"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    // Transforma archivos TypeScript usando ts-jest
    transform: {
        "^.+\\.(t|j)sx?$": ["ts-jest", { isolatedModules: true }]
    },
    // Limpia los mocks entre cada prueba
    clearMocks: true,
    // Recolecta cobertura de código
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    // Extensiones de archivos que Jest reconocerá
    moduleFileExtensions: ["ts", "js", "json"],
    // Patrón de nombres para detectar archivos de prueba
    testMatch: ["**/*.test.ts", "**/*.spec.ts"],
    // Ignora la transformación de archivos en node_modules
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    // Configuración global para ts-jest
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
exports.default = config;
