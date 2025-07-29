import { isImageByLoading, pick } from '@/utils/webtool'
// image type
const defaultExt = '.png,.jpeg,.jpg,.gif,.webp,.bmp,.svg,.ico,.tiff,.heif,.avif,.apng,.jp2,.jxl,.psd,.raw,.cr2,.nef,.orf,.sr2,.dng'

// 选择文件参数配置
const openImageOptions = {
    title: '选择文件',
    properties: ['openFile', 'multiSelections'],
    filters: [
        { name: 'Images', extensions: ['jpg', 'png'] }
        // { name: 'All Files', extensions: ['*'] }
    ]
}

/**
 * 上传图片
 */
export function uploadImage({ multiple }) {
    const options = openImageOptions
    if (!multiple) {
        options.properties = ['openFile']
    }
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog(options)
}

/**
 * 图片转换
 * @param {*} path
 * @param {*} format
 * @returns Promise
 */
export async function convertImage(path, format) {
    // electron环境才能获取file对象的path属性
    return window.electronAPI.handleImageConvert({ path, format })
}

/**
 * 打开文件夹
 */
export function openFolder() {
    window.electronAPI.openFolder()
}

export function saveImage(imageData) {
    window.electronAPI.saveImage(imageData)
}

/**
 * 筛选文件格式
 * @param {*} ext 类型
 * @param {*} multiple 多选
 */
export async function pickImage(ext = defaultExt, multiple = true) {
    const images = []
    const errFiles = []
    const files = await pick(ext, multiple)
    for (let i = 0; i < files.length; i++) {
        // 跳过空文件
        if (files[i].size === 0) {
            continue
        }
        const flag = await isImageByLoading(files[i])
        if (flag) {
            images.push(files[i])
        }
        else {
            errFiles.push(files[i])
        }
    }
    // 上传失败提示
    if (errFiles.length) {
        const errFilesName = errFiles.map(x => x.name).join()
        window.$message.error(`以下文件上传失败：${errFilesName}`)
    }
    return images
}
