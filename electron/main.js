// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isImageFile } from './imageCheck.js'
import { convertImage } from './imageMagick.js'
import { ensureOutputDirExists, getDesktopPath, selectFolder, openFolder } from './output.js'
import { saveImage } from './saveFile.js'

let storagePath = ''

// 获取当前文件目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // 启用安全相关功能
      contextIsolation: true, // 强烈建议启用
      sandbox: true, // 启用沙箱
      webSecurity: true, // 启用web安全
      nodeIntegration: false, // 如果不需要Node集成，设为false更安全
      enableRemoteModule: false // 禁用remote模块
    }
  })

  // 将链接修改成我们运行Vue时的地址：http://localhost:5173
  // mainWin.loadFile(path.join(__dirname, "./index.html"));
  // mainWin.loadURL('http://localhost:5173', {
  //   extraFiles: [
  //     'node_modules/element-plus/dist/**/*' // 打包时包含 Element 样式
  //   ]
  // })
  mainWin.loadFile(path.join(__dirname, '../dist/index.html'), {
    extraFiles: [
      'node_modules/element-plus/dist/**/*' // 打包时包含 Element 样式
    ]
  })
  mainWin.webContents.openDevTools()
}

// 准备完成调用创建方法
app.whenReady().then(() => {
  createWindow()
  ensureOutputDirExists()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 打开文件选择窗口
ipcMain.on('open-file-dialog', async (event,options) => {
  const result = await dialog.showOpenDialog(options)
  if (!result.canceled) {
    // 真实文件路径 & 过滤文件仅保留图片类型
    const filePaths = result.filePaths.filter((filePath) => {
      return isImageFile(filePath) // 使用上面定义的任意判断方法
    })
    // 获取文件名称
    const fileNames = filePaths.map((filePath) => path.basename(filePath))
    // 将文件路径返回渲染进程
    BrowserWindow.getFocusedWindow().webContents.send('file-selected', {
      paths: filePaths,
      names: fileNames
    })
  }
})

//接收图片转换事件
ipcMain.handle('handle-image-convert', async (event, info) => {
  // 解析文件路径
  const parsedPath = path.parse(info.filePath)
  // 获取文件名（不包括后缀）
  const fileName = parsedPath.name
  const outputPath = `${storagePath}\\${fileName}.${info.format}`
  return await convertImage(info.filePath, outputPath, info.format)
})

// 选择文件夹
ipcMain.handle('select-output-path', async (event) => {
  storagePath = await selectFolder()
  return storagePath
})

//获取桌面路径
ipcMain.handle('get-desktop-path', () => {
  storagePath = getDesktopPath()
  return storagePath
})

// 打开文件夹
ipcMain.on('open-folder', () => {
  openFolder(storagePath)
})

// 添加保存图片的IPC处理
ipcMain.handle('save-image', async (event, imageData) => {
  saveImage(imageData, storagePath)
})