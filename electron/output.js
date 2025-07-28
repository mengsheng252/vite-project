import fs from 'node:fs'
import path from 'node:path'
// const { app } = require('electron')
// const path = require('path')
// const { shell } = require('electron');
import { app, dialog, shell } from 'electron'

/**
 * 获取桌面路径
 * @returns
 */
export function getDesktopPath() {
    // 优先使用 Electron 提供的方法
    if (app && app.getPath) {
        return app.getPath('desktop')
    }

    // 备用方案
    const home = process.env.HOME || process.env.USERPROFILE
    return path.join(home, 'Desktop')
}

/**
 * 判断输出路径是否正确
 * @returns
 */
export function ensureOutputDirExists() {
    const outputDir = getDefaultOutputDir()
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    return outputDir
}

/**
 * 设置默认输出目录
 * @returns
 */
export function getDefaultOutputDir() {
    return path.join(app.getPath('userData'), 'outputs')
}

/**
 * 选择文件夹
 * @returns
 */
export function selectFolder() {
    return new Promise((resolve, reject) => {
        dialog
            .showOpenDialog({
                properties: ['openDirectory']
            })
            .then((result) => {
                if (!result.canceled) {
                    console.log('Selected folder path:', result.filePaths[0])
                    resolve(result.filePaths[0])
                }
                else {
                    console.log('No folder selected')
                    reject()
                }
            })
            .catch((err) => {
                console.error('An error occurred:', err)
                reject(err)
            })
    })
}

/**
 * 打开目标文件夹
 * @param {*} folder
 */
export function openFolder(folder) {
    shell.openPath(folder) // Windows
        .then(() => console.log('文件夹已打开'))
        .catch(err => console.error('打开失败:', err))
}
