class Watermark {
    constructor(config = {}) {
        this.config = Object.assign({
            id: 'canvas',
            text: 'default',
            fontSize: 16,
            color: '#000',
            rotate: 0, // 角度（度）
            cover: false, // 是否平铺
            width: 400,
            height: 400,
            dx: 40, // 水平间距
            dy: 40, // 垂直间距
            tx: 0, // 横向移动
            ty: 0, // 垂直移动
            font: 'sans-serif',
            opacity: 1
        }, config)
    }

    getCanvas() {
        let canvas = document.getElementById(this.config.id)
        if (!canvas) {
            canvas = document.createElement('canvas')
            canvas.id = this.config.id
            document.body.appendChild(canvas)
        }
        canvas.width = this.config.width
        canvas.height = this.config.height
        return canvas
    }

    drawText(ctx, x, y) {
        ctx.save()
        ctx.globalAlpha = this.config.opacity
        ctx.font = `${this.config.fontSize}px ${this.config.font}`
        ctx.fillStyle = this.config.color
        const tx = this.config.tx || 0
        const ty = this.config.ty || 0
        if (this.config.rotate) {
            ctx.translate(x + tx, y + ty)
            ctx.rotate(this.config.rotate * Math.PI / 180)
            ctx.fillText(this.config.text, 0, 0)
        }
        else {
            ctx.fillText(this.config.text, x + tx, y + ty)
        }
        ctx.restore()
    }

    draw() {
        const canvas = this.getCanvas()
        const ctx = canvas.getContext('2d')
        if (this.config.cover) {
            // 平铺
            for (let y = 0; y < canvas.height; y += this.config.dy) {
                for (let x = 0; x < canvas.width; x += this.config.dx) {
                    this.drawText(ctx, x, y)
                }
            }
        }
        else {
            // 单次绘制
            this.drawText(ctx, this.config.width / 2, this.config.height / 2)
        }
        return canvas
    }

    async drawWithImage(imgSrc) {
        const img = await this.loadImage(imgSrc)
        // 用图片实际尺寸设置 canvas
        const canvas = this.getCanvas()
        canvas.width = img.naturalWidth || img.width
        canvas.height = img.naturalHeight || img.height
        const ctx = canvas.getContext('2d')

        // 绘制底图（不缩放）
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // 绘制水印
        if (this.config.cover) {
            for (let y = 0; y < canvas.height; y += this.config.dy) {
                for (let x = 0; x < canvas.width; x += this.config.dx) {
                    this.drawText(ctx, x, y)
                }
            }
        }
        else {
            this.drawText(ctx, canvas.width / 2, canvas.height / 2)
        }
        return canvas
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }

    toBase64(type = 'image/png', quality = 0.92) {
        const canvas = document.getElementById(this.config.id)
        if (!canvas)
            return ''
        return canvas.toDataURL(type, quality)
    }
}

export default Watermark
