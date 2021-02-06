module.exports = {
    plugins: ['react'],
    rules: {
        'indent': ['error', 4],
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        // allow jsx syntax in js files (for next.js project)
        'react/jsx-filename-extension': [
            1,
            { 'extensions': ['.js', '.jsx'] },
        ], // should add ".ts" if typescript project
        'react/jsx-filename-extension': 'off',
        'object-curly-spacing': [1, 'always'],
        'require-jsdoc': 'off',
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
};
