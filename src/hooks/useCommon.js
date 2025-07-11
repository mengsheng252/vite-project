// import { getCurrentInstance } from 'vue'
import { isImageByLoading, pick } from '@/utils/webtool'

// const { proxy } = getCurrentInstance()

const defaultExt = '.png,.jpeg,.jpg,.gif,.webp,.bmp,.svg,.ico,.tiff,.heif,.avif,.apng,.jp2,.jxl,.psd,.raw,.cr2,.nef,.orf,.sr2,.dng'
// const defaultExt = '.png,.jpeg,.jpg'
const defaultMultiple = true // 是否允许多选

export function doConvert() {
    pickImage()
}

/**
 * 筛选文件格式
 * @param {*} ext 类型
 * @param {*} multiple 多选
 */
async function pickImage(ext = defaultExt, multiple = defaultMultiple) {
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
}
