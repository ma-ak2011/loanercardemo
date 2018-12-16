module.exports = {
    verbose: true,
    transform: {
        '^.+\\.js$'  : '<rootDir>/node_modules/babel-jest',
        '^.+\\.jsx$'  : '<rootDir>/node_modules/babel-jest',
    },
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: [
        "node_modules",
        "src/js"
    ]

};