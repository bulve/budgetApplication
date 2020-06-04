module.exports = {
    preset: "ts-jest",
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["js", "ts", "tsx"],
    verbose: true,
    cacheDirectory: "./target/tmp/",
    coverageDirectory: "./target/coverage",
    // coverageThreshold: {
    //     global: {
    //         branches: 95,
    //         functions: 95,
    //         lines: 95,
    //         statements: 95
    //     }
    // },
    // collectCoverageFrom: [
    //     "**/*[^d\\.].ts",
    //     "!**/node_modules/**",
    //     "!**/target/**",
    //     "!**/__tests__/**",
    //     "!**/index.ts",
    //     "!**/**Error**.ts",
    //     "!**/**FieldMetadata.ts",           //interface only 
    //     "!**/**FieldValueChangeEvent.ts",   //dto
    //     "!**/Reducer.ts",                   //interface only
    //     "!**/RulePayloadHandler.ts",        //interface only
    //     "!**/RepositoryClient.ts",          //deprecated
    //     "!**/info/iterators/**"             //deprecated
    // ],
    testEnvironment: "node",
    // setupFilesAfterEnv: ["./__tests__/Asserts.js", "./__tests__/loggerConfig.js"]
};
