import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import eslint from 'vite-plugin-eslint'

const pathSrc = path.resolve(__dirname, './src')
// https://vite.dev/config/
export default defineConfig({
    base: './', // 强制使用相对路径
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                // 强制所有资源使用相对路径
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        }
    },
    plugins: [
        vue(),
        eslint({
            fix: true, // 自动修复
            include: ['src/**/*.js', 'src/**/*.vue']
        }),
        electron({
            entry: 'electron/main.js', // 主进程入口文件
            onstart(options) {
                options.startup() // 自动重启 Electron
            }
        })
    ],
    server: {
        hmr: {
            host: 'localhost',
            port: 5173,
            protocol: 'ws'

        }
    },
    resolve: {
        alias: {
            '@': pathSrc,
            '~@': new URL('./src', import.meta.url).pathname
        }
    },
    optimizeDeps: {
        include: ['bootstrap', '@popperjs/core'] // 强制预构建
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/css/index.scss" as *;`
            }
        }
    }
})
