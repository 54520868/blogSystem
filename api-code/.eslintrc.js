module.exports = {
    // 只会在当前目录获取eslint配置文件，不会跑到父级目录中
    "root": true,
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": 1,
        "no-constant-condition": 'error',
        "no-empty": 2,
        "quotes": ["error", "backtick", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "no-multi-spaces": ["warn", { ignoreEOLComments: false }]
        // "template-curly-spacing": ["error", "never"]
    }
}
