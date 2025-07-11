import { isImageByLoading, pick } from '@/utils/webtool'

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
    // 提取未上传成功的图片toast提示哪些文件上传失败及其原因？
    console.log('上传的图片：', images)
}
