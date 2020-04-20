const tasks = (arr) => arr.join(" && ");

module.exports = {
    hooks: {
        "pre-commit": tasks(["npm run format"]),
        // 'pre-push': tasks(['npm run format', 'npm run test:huskey']),
        // 'pre-commit': tasks(['npm run lint', 'npm run test:huskey']),
        // 'pre-push': tasks(['npm run lint']),
    },
};
