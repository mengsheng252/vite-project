const { contextBridge, ipcRenderer } = require('electron')

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
  getDesktopPath: ()=> ipcRenderer.invoke('get-desktop-path'),
  openFileDialog: (options) => ipcRenderer.send('open-file-dialog', options),
  onFileSelected: (callback) => {
    // 监听主进程返回的文件信息
    ipcRenderer.on('file-selected', (event, data) => callback(data))
  },
  handleImageConvert: (info) => ipcRenderer.invoke('handle-image-convert', info),
  handlePath: () => ipcRenderer.invoke('select-output-path'),
  openFolder: ()=> ipcRenderer.send('open-folder')
})
