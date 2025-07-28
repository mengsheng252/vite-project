const { contextBridge, ipcRenderer } = require('electron')

const handlers = new Set() // 存储所有回调函数

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    // 单向通信：只发送消息到主进程，不等待响应，无返回值
    send: (...args) => ipcRenderer.send(...args),
    on: (...args) => ipcRenderer.on(...args),
    // 双向通信：发送消息到主进程并等待响应，返回promise
    invoke: (...args) => ipcRenderer.invoke(...args)
    // 可以根据需要暴露更多方法
    // getFilePath: (file) => ipcRenderer.invoke('get-file-path', file.path)
  },
  getDesktopPath: () => ipcRenderer.invoke('get-desktop-path'),
  openFileDialog: (options) => ipcRenderer.send('open-file-dialog', options),

  onFileSelected: (callback) => {
    const handler = (event, data) => callback(data)
    ipcRenderer.on('file-selected', handler)
    // 返回一个移除监听器的函数
    return () => {
      ipcRenderer.off('file-selected', handler)
    }
  },
  handleImageConvert: (info) => ipcRenderer.invoke('handle-image-convert', info),
  handlePath: () => ipcRenderer.invoke('select-output-path'),
  openFolder: () => ipcRenderer.send('open-folder'),
  saveImage: (imageData) => ipcRenderer.invoke('save-image', imageData),
  changeImageSize: (data) => ipcRenderer.send('change-image-size', data)
})
