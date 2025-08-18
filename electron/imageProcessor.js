import path from 'node:path'
// const sharp = require('sharp');
import sharp from 'sharp'
// import MessageManager from "./message-manager.js"
import { BrowserWindow } from 'electron'
import fs from 'node:fs'

/**
 * 图片格式转换
 * @param {*} inputPath 输入路径，完整路径包含文件名加后缀
 * @param {*} outputPath 输出路径，似乎会影响format
 * @param {*} format 转换格式
 * @returns
 */
export async function convertImage(inputPath, outputPath, format) {
    new Promise((resolve, reject) => {
        sharp(inputPath)
            .toFormat(format)
            .toFile(outputPath, (err, info) => {
                if (err) {
                    console.error('Error occurred:', err)
                    // process.exit(1)
                    sendMsgToRender({
                        name: 'imageConvert',
                        status: 'error',
                        errFile: inputPath
                    })
                }
                else {
                    console.log('Image saved to:', outputPath)
                    console.log('Image info:', info)
                    sendMsgToRender({
                        name: 'imageConvert',
                        status: 'success',
                        errFile: null
                    })
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
                sendMsgToRender({
                    name: 'changeSize',
                    status: 'success',
                    errFile: null
                })
            })
            .catch((err) => {
                // reject(err)
                sendMsgToRender({
                    name: 'changeSize',
                    status: 'error',
                    errFile: inputPath
                })
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


/**
 * 图片翻转+旋转
 * @param {*} filePath
 * @param {*} outputPath
 * @param {*} options
 */
export async function imageFlip(filePath, outputPath, options) {
    await sharp(filePath)
        .flip(options.flipY)
        .flop(options.flipX)
        .rotate(options.rotate)
        .toFile(outputPath)
        .then(() => {
            sendMsgToRender({
                name: 'imageFlip',
                status: 'success',
                errFile: null
            })
        }).catch(() => {
            sendMsgToRender({
                name: 'imageFlip',
                status: 'error',
                errFile: filePath
            })
        })
}

/**
 * 图片处理结果-统一返回消息给渲染进程
 * @param {*} args {name, status, errFile}
 */
function sendMsgToRender(args) {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    focusedWindow.webContents.send('image-process', args)
}

/**
 * 获取图片数据
 * @param {*} filePath
 * @returns
 */
export async function getImageData(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        return {
            width: metadata.width,
            height: metadata.height
        };
    } catch (error) {
        console.error('Error getting image dimensions:', error);
        return null;
    }
}

/**
 * 图片质量压缩
 * @param {*} input
 * @param {*} output
 * @param {*} quality
 */
export async function compressImage(input, output, quality) {
    const { format } = await sharp(input).metadata();
    try {
        if (format === 'jpeg') {
            sharp(input)
                .jpeg({ quality, mozjpeg: true })
                .toFile(output)
        } else if (format === 'png') {
            sharp(input)
                .png({ compressionLevel: 9 })
                .toFile(output);
        } else {
            sharp(input)
                .webp({ quality })
                .toFile(output);
        }
        sendMsgToRender({
            name: 'imageCompress',
            status: 'success',
            errFile: null
        })
    } catch (error) {
        sendMsgToRender({
            name: 'imageCompress',
            status: 'error',
            errFile: input
        })
    }
}

export async function blurImage(inputPath, outputPath, blurValue = 5) {
    try {
        const buffer = await sharp(inputPath)
            .blur(blurValue)  // 模糊半径 (0.3~1000，值越大越模糊)
            // .toFile(outputPath)
            .toBuffer();
        return buffer.toString('base64');
    } catch (err) {
        console.error('模糊失败:', err);
    }
}


export async function sharpenImage(inputPath, outputPath, sigma) {
    try {
        const buffer = await sharp(inputPath)
            .sharpen({
                sigma,       // 锐化强度 (0.3~1000，默认1.0)
                flat: 1.0,      // 平坦区域的锐化强度 (0.0~1.0)
                jagged: 1.0     // 边缘锐化强度 (0.0~1.0)
            })
            // .toFile(outputPath)
            .toBuffer()
        return buffer.toString('base64');
    } catch (err) {
        console.error('锐化失败:', err);
    }
}

export function saveBase64File(base64Data, outputPath, filePath) {
    try {
        const base64Content = base64Data.split(';base64,').pop();
        const buffer = Buffer.from(base64Content, 'base64');
        fs.writeFileSync(outputPath, buffer);
        sendMsgToRender({
            name: 'imageCompress',
            status: 'success',
            errFile: null
        })
    } catch (error) {
        console.log("err",error);
        sendMsgToRender({
            name: 'imageCompress',
            status: 'error',
            errFile: filePath
        })
    }
}