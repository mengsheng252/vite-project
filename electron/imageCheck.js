// const path = require('path');
import path from "path"

/**
 * 常规格式判断是否图片类型
 * @param {*} filePath 文件路径
 * @returns 
 */
export function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const imageExtensions = [
    '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi',
    '.png', '.gif', '.webp', 
    '.bmp', '.dib',
    '.svg', '.svgz',
    '.tif', '.tiff',
    '.ico', '.cur'
  ];
  return imageExtensions.includes(ext);
}