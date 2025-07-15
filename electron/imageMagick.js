// const sharp = require('sharp');
import sharp from 'sharp'

/**
 * 图片格式转换
 * @param {*} inputPath 输入路径
 * @param {*} outputPath 输出路径，似乎会影响format
 * @param {*} format 转换格式
 * @returns 
 */
export async function convertImage(inputPath, outputPath, format) {
  return new Promise((resolve,reject)=>{
      sharp(inputPath)
        .toFormat(format)
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Error occurred:', err)
            process.exit(1)
            resolve(false)
          } else {
            console.log('Image saved to:', outputPath)
            console.log('Image info:', info)
            resolve(true)
          }
        })
  })
}
