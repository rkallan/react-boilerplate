module.exports = {
    extends: ['./best-practices', './errors', './node', './style', './variables', './es6', './imports', './strict'].map(require.resolve),
    rules: {},
};
