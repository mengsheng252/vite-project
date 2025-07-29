/**
 * @name Eslint.Config
 * @requires antfu/eslint-config: https://github.com/antfu/eslint-config
 * @requires unocss/eslint-config: https://github.com/antfu/eslint-config
 * @requires eslint-plugin-format: https://github.com/antfu/eslint-plugin-format
 * @example https://github.com/antfu/vitesse-nuxt3/blob/main/package.json
 */
import antfu from '@antfu/eslint-config'

export default antfu({
    //   unocss: true, // 支持unocss格式化
    //   formatters: true, // 支持外部格式化
    rules: {
        // 'unused-imports/no-unused-imports': 'off', // 允许未使用的导入
        // 'unused-imports/no-unused-vars': 'off', // 允许未使用的变量
        'jsonc/indent': ['error', 4, {}],
        'semi': ['error', 'never'],
        'style/semi': ['error', 'never'],
        'style/indent': ['error', 4], // 使用四个空格进行缩进
        'style/comma-dangle': 'off',
        'node/prefer-global/process': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
        'indent': ['error', 4], // 使用四个空格进行缩进
        'eqeqeq': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 'off',
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'camelcase': 'warn',
        'arrow-body-style': ['error', 'as-needed'],
        'generator-star-spacing': 0, // allow async-await
        'array-callback-return': 'off',
        'vue/block-order': 'off',
        'vue/html-indent': ['error', 4],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        'vue/no-multi-spaces': ['error', {
            ignoreProperties: false
        }],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'any',
                    component: 'any'
                }
            }
        ],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 1
            },
            multiline: {
                max: 1
            }
        }]
    },
    ignores: [
        './src/assets/**/*.js',
        './src/assets/fonts/iconfont.js',
        './dist',
        './node_modules',
        './electron/*.js',
        '*.json'
    ]
})
