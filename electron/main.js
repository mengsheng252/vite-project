// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import { imageTransform } from './imageMagick.js'

// 获取当前文件目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 推荐开启
      nodeIntegration: false // 推荐关闭
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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain.on('process-image', (event, filePath) => {
//   console.log('---接收到的数据：', filePath)
//   // imageTransform(filePath)
// })

// 打开文件选择窗口
ipcMain.on('open-file-dialog', () => {
  dialog
    .showOpenDialog({
      properties: ['openFile']
    })
    .then((result) => {
      if (!result.canceled) {
        // 真实文件路径
        const filePaths = result.filePaths
        console.log('主进程获取的路径:', filePaths)
        // 获取文件名称
        const fileNames = filePaths.map((filePath) => path.basename(filePath))
        // 将文件路径返回渲染进程
        BrowserWindow.getFocusedWindow().webContents.send('file-selected', {
          paths: filePaths,
          names: fileNames
        })
        // imageTransform(filePath)
      }
    })
})
