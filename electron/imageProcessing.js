import path from 'node:path'
// const sharp = require('sharp');
import sharp from 'sharp'

/**
 * 图片格式转换
 * @param {*} inputPath 输入路径，完整路径包含文件名加后缀
 * @param {*} outputPath 输出路径，似乎会影响format
 * @param {*} format 转换格式
 * @returns
 */
export async function convertImage(inputPath, outputPath, format) {
    return new Promise((resolve, reject) => {
        sharp(inputPath)
            .toFormat(format)
            .toFile(outputPath, (err, info) => {
                if (err) {
                    console.error('Error occurred:', err)
                    reject(err)
                    process.exit(1)
                }
                else {
                    console.log('Image saved to:', outputPath)
                    console.log('Image info:', info)
                    resolve(true)
                }
            })
    })
}

/**
 *
 * @param {*} inputPath 输入路径
 * @param {*} outputPath 输出路径
 * @param {*} size {width,height} 图片尺寸
 * @returns
 */
export async function changeSize(inputPath, outputPath, size) {
    return new Promise((resolve, reject) => {
        sharp(inputPath)
            .resize(size.width, size.height)
            .toFile(outputPath)
            .then(() => {
                console.log(' changeSize success ', outputPath)
                resolve(true)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 *
 * @param {*} filePath 文件路径-包含文件名和后缀
 * @param {*} storagePath 保存文件夹路径
 * @returns 文件保存路径
 */
export function getOutput(filePath, storagePath) {
    // 解析文件路径
    const parsedPath = path.parse(filePath)
    // 获取文件名（不包括后缀）
    const fileName = parsedPath.name + Date.now()
    const format = parsedPath.ext.slice(1)
    const outputPath = `${storagePath}\\${fileName}.${format}`
    return outputPath
}
