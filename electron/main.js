// const { app, BrowserWindow } = require('electron')
import {app,BrowserWindow } from "electron"
// const path = require("path")
 
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 800,
  })
  
  //将链接修改成我们运行Vue时的地址：http://localhost:5173
  //mainWin.loadFile(path.join(__dirname, "./index.html"));
  mainWin.loadURL('http://localhost:5173')
 
}
 
// 准备完成调用创建方法
app.whenReady().then(() => {
  createWindow()
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})