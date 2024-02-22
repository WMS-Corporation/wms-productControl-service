module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-console": "warn",
        "no-unused-vars": "warn",
        "no-undef": "error",
        "no-extra-semi": "error",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "space-infix-ops": ["error", {"int32Hint": false}],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "brace-style": ["error", "1tbs"]
    },
    "ignorePatterns": [
        "test/**/*.js",
    ]
}
