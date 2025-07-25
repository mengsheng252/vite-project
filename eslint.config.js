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
        'eslint-comments/no-unlimited-disable': 0, // 禁止使用eslint-disable
        'vue/block-order': 'off',
        'style/semi': ['error', 'never'],
        'style/indent': ['error', 4], // 使用四个空格进行缩进
        'style/comma-dangle': ['error', 'never'],
        'style/brace-style': 'error', // 要求在代码块中使用一致的大括号风格
        'semi': ['warn', 'never'], // 禁止尾部使用分号
        'no-console': 'off', // 禁止出现console
        'no-debugger': 'off', // 禁止出现debugger
        'no-cond-assign': 'off', // 禁止出现重复case
        'no-duplicate-case': 'warn', // 禁止出现重复case
        'no-empty': 'warn', // 禁止出现空语句块
        'no-extra-parens': 'off', // 禁止不必要的括号
        'no-func-assign': 'warn', // 禁止对Function声明重新赋值
        'no-unreachable': 'warn', // 禁止出现[return|throw]之后的代码块
        'no-else-return': 'warn', // 禁止if语句中return语句之后有else块
        'no-empty-function': 'warn', // 禁止出现空的函数块
        'no-lone-blocks': 'warn', // 禁用不必要的嵌套块
        'no-multi-spaces': 'warn', // 禁止使用多个空格
        'no-redeclare': 'warn', // 禁止多次声明同一变量
        'no-return-assign': 'warn', // 禁止在return语句中使用赋值语句
        'no-return-await': 'warn', // 禁用不必要的[return/await]
        'no-self-compare': 'warn', // 禁止自身比较表达式
        'no-useless-catch': 'warn', // 禁止不必要的catch子句
        'no-useless-return': 'warn', // 禁止不必要的return语句
        'no-mixed-spaces-and-tabs': 'warn', // 禁止空格和tab的混合缩进
        'no-multiple-empty-lines': 'warn', // 禁止出现多行空行
        'no-trailing-spaces': 'warn', // 禁止一行结束后面不要有空格
        'no-useless-call': 'warn', // 禁止不必要的.call()和.apply()
        'no-var': 'warn', // 禁止出现var用let和const代替
        'no-delete-var': 'off', // 允许出现delete变量的使用
        'no-shadow': 'off', // 允许变量声明与外层作用域的变量同名
        'dot-notation': 'warn', // 要求尽可能地使用点号
        'default-case': 'warn', // 要求switch语句中有default分支
        'eqeqeq': 'warn', // 要求使用 === 和 !==
        'curly': 'warn', // 要求所有控制语句使用一致的括号风格
        'space-before-blocks': 'warn', // 要求在块之前使用一致的空格
        'space-in-parens': 'warn', // 要求在圆括号内使用一致的空格
        'space-infix-ops': 'warn', // 要求操作符周围有空格
        'space-unary-ops': 'warn', // 要求在一元操作符前后使用一致的空格
        'switch-colon-spacing': 'warn', // 要求在switch的冒号左右有空格
        'arrow-spacing': 'warn', // 要求箭头函数的箭头前后使用一致的空格
        'array-bracket-spacing': 'warn', // 要求数组方括号中使用一致的空格
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }], // 要求在代码块中使用一致的大括号风格// 允许 Stroustrup 风格（右大括号换行）
        'camelcase': 'warn', // 要求使用骆驼拼写法命名约定
        // 'indent': ['warn', 4], // 要求使用JS一致缩进4个空格
        // 'space-before-function-paren': ['error', 'never'], // 函数声明时括号与函数名间加空格
        'no-useless-escape': 'warn', // 禁止不必要的转义
        'key-spacing': ['error', { mode: 'strict' }], // 要求变量前后空格
        'eol-last': ['error', 'always'], // 要求在非空文件末尾至少存在一行空行（或缺少换行）
        'no-duplicate-imports': 'error', // 禁止重复导入
        'keyword-spacing': ['error', { before: true }], // 要求单个模块的所有的导入都在同一个 import 语句中
        'comma-dangle': 'error', // 要求或禁止使用拖尾逗号
        'comma-spacing': ['error', { before: false, after: true }], // 要求逗号左边没有空格，右边有空格。
        'no-sequences': 'error', // 不允许使用逗号操作符
        'padded-blocks': ['error', 'never'], // 禁止块语句和类的开始或末尾有空行
        'vue/no-multiple-template-root': 'error',
        'no-unused-vars': 'off',
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'always'
        }],
        'no-mixed-operators': [ // 禁止混合使用操作符
            'error',
            {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof']
                ],
                allowSamePrecedence: true
            }
        ],
        'vue/html-indent': ['error', 4],
        // 'vue/html-closing-bracket-newline': 'off',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/multiline-html-element-content-newline': 'warn',
        'vue/singleline-html-element-content-newline': 'warn',
        'vue/html-self-closing': ['error', { html: { void: 'never', normal: 'any', component: 'any' } }],
        'vue/no-v-html': 'off',
        'vue/prop-name-casing': ['error', 'camelCase']
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
