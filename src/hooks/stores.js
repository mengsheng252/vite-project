import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
    state: () => ({
        files: null,
        uploadFileListener: null
    }),
    actions: {
        setupFileListener() {
            this.uploadFileListener = window.electronAPI.onFileSelected((info) => {
                console.log('store  ', info)
                this.files = info
            })
        },
        reset() {
            this.files = null
            // 关闭文件上传事件监听
            if (this.uploadFileListener) {
                this.uploadFileListener()
            }
        }
    }
})
