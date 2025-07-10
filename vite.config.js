import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

const pathSrc = path.resolve(__dirname, './src')
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslint({
            fix: true, // 自动修复
            include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue']
        })
    ],
    resolve: {
        alias: {
            '@': pathSrc,
            '~@': new URL('./src', import.meta.url).pathname
        }
    },
    optimizeDeps: {
        include: ['bootstrap', '@popperjs/core'] // 强制预构建
    }
})
