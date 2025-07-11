const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    send: (...args) => ipcRenderer.send(...args),
    on: (...args) => ipcRenderer.on(...args)
    // 可以根据需要暴露更多方法
    // getFilePath: (file) => ipcRenderer.invoke('get-file-path', file.path)
  },
  openFileDialog: () => ipcRenderer.send('open-file-dialog'),
  onFileSelected: (callback) => {
    // 监听主进程返回的文件信息
    ipcRenderer.on('file-selected', (event, data) => callback(data))
  }
})
