module.exports = {
    arrowParens: "always",
    bracketSpacing: true,
    cursorOffset: -1,
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    insertPragma: false,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 160,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    useTabs: false,
    overrides: [
        {
            files: ".prettierrc",
            options: { parser: "json" },
        },
        {
            files: "*.svg",
            options: { parser: "xml" },
        },
    ],
};
