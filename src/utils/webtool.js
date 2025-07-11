/**
 * 获取文件
 * @template T extends boolean
 * @param {string} [accept] 'image/png'
 * @param {T} [multiple]
 * @returns {Promise<T extends boolean ? File[] : File>} 返回选中的文件数组或文件
 */
export function pick(accept, multiple) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        accept = accept ? accept.trim() : ''
        input.type = 'file'
        input.multiple = multiple
        let count = 0
        function hasSelectedFile() {
            if (input.value !== '') {
                resolve(multiple ? Array.from(input.files) : input.files[0])
            }
            else if (++count >= 40) {
                reject(new Error('pick cancel'))
            }
            else {
                setTimeout(hasSelectedFile, 50)
            }
        }

        function focus() {
            window.removeEventListener('focus', focus)
            hasSelectedFile()
        }

        window.addEventListener('focus', focus)
        input.onchange = focus
        input.accept
        = accept === 'image'
                ? 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg+xml,image/bmp,image/x-icon'
                : accept
        input.click()
        // if (accept[0] === '.' && navigator.userAgent.includes('Quark')) {
        //     // 夸克浏览器特殊处理
        //     if (!accept.includes(',')) {
        //         console.log('需要把 .jpe 转换为 image/jpeg')

        //         // 把 .jpe 转换为 image/jpeg
        //         // import('mime')
        //         //     .then((x) => {
        //         //         input.accept = x.getType(accept)
        //         //     })
        //         //     .finally(() => input.click())
        //     }
        //     else {
        //         // 如果设置了多种格式,则不限制格式
        //         input.click()
        //     }
        // }
        // else {
        //     input.accept
        // = accept === 'image'
        //             ? 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg+xml,image/bmp,image/x-icon'
        //             : accept
        //     input.click()
        // }
    })
}

/**
 * 通过浏览器渲染判断是否为图片，大文件性能差
 * @param {*} file 文件
 * @returns boolean
 */
export function isImageByLoading(file) {
    return new Promise((resolve) => {
        const url = createSafeObjectURL(file)
        if (url) {
            console.log('url-75', url)

            const img = new Image()
            img.src = url
            img.onload = () => {
                URL.revokeObjectURL(url)
                console.log(' 图片 load成功')

                resolve(true)
            }
            img.onerror = () => {
                URL.revokeObjectURL(url)
                console.log(' 图片 load失败')
                resolve(false)
            }
        }
        else {
            resolve(false)
        }
    })
}

/**
 * 创建临时url
 * @param {*} file
 * @returns null | url
 */
function createSafeObjectURL(file) {
    // 检查文件是否有效
    if (!file || file.size === 0) {
        console.error('文件为空或已损坏', file)
        return null
    }

    // 尝试生成 URL
    try {
        const url = URL.createObjectURL(file)
        return url
    }
    catch (error) {
        console.error('createSafeObjectURL error', error)
        return null
    }
}
