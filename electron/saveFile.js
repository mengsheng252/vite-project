import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dialog } from 'electron'
import fs from 'fs-extra'

// 获取当前文件目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function saveImage(imageData, storagePath) {
    // 弹出保存对话框
    const { filePath } = await dialog.showSaveDialog({
        title: '保存图片',
        defaultPath: path.join(__dirname, `${storagePath}/cropped-image.png`),
        filters: [
            { name: 'PNG 图片', extensions: ['png'] },
            { name: 'JPEG 图片', extensions: ['jpg', 'jpeg'] }
        ]
    })

    if (!filePath)
        return false // 用户取消保存

    try {
        // 移除 data URL 前缀
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')

        // 写入文件
        fs.writeFileSync(filePath, buffer)
        return true
    }
    catch (error) {
        console.error('保存图片失败:', error)
        return false
    }
}
