import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
    state: () => ({
        file: null,
        files: [],
        errFiles: [],
        convertCount: 0,
        uploadFileListener: null
    }),
    actions: {
        setupFileListener() {
            this.uploadFileListener = window.electronAPI.onFileSelected((info) => {
                this.files = info.paths.map((path, index) => ({
                    path,
                    name: info.names[index]
                }))
                this.file = info.paths[0]
                this.convertCount = 0
            })
        },
        reset() {
            this.file = null
            this.files = []
            this.errFiles = []
            this.convertCount = 0
            // 关闭文件上传事件监听
            if (this.uploadFileListener) {
                this.uploadFileListener()
            }
        }
    }
})
