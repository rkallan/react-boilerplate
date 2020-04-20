module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: ["eslint:recommended", "plugin:jsx-a11y/recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    plugins: ["react", "react-hooks", "jsx-a11y", "prettier", "babel"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            globalReturn: true,
        },
    },
    settings: {
        react: {
            pragma: "React",
            version: "16.13",
        },
        "import/extensions": [".js", ".jsx"],
    },
};
