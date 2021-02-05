module.exports = {
    extends: ['google', 'plugin:react/recommended'],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
    },
    plugins: ['react'],
    rules: {
        'indent': ['error', 4],
        'react/jsx-filename-extension': 'off',
        'object-curly-spacing': [1, 'always'],
        // 'camelcase': 'off',
        'require-jsdoc': 'off',
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
};
