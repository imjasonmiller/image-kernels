import FrameCounter from "./framecounter"

export const getCanvasElement = (elem: string): HTMLCanvasElement => {
    const canvas = document.querySelector(elem)

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new TypeError(`"${elem}" is not an instance of HTMLCanvasElement`)
    }

    return canvas
}

export const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image()

        img.addEventListener("load", (): void => resolve(img))
        img.addEventListener("error", (): void =>
            reject(new Error("image could not be loaded")),
        )

        img.src = url
    })

class FilterCanvas {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    image: HTMLImageElement | undefined
    frames: FrameCounter

    constructor(elem: string, imgUrl: string) {
        this.canvas = getCanvasElement(elem)
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D

        this.frames = new FrameCounter(30)

        this.image = undefined

        this.initCanvas(imgUrl)
    }

    async initCanvas(imgUrl: string): Promise<void> {
        try {
            this.image = await loadImage(imgUrl)

            const aspect = this.image.width / this.image.height

            this.canvas.width = parseInt(
                getComputedStyle(this.canvas).getPropertyValue("max-width"),
                10,
            )
            this.canvas.height = this.image.width / aspect

            requestAnimationFrame(this.render)
        } catch (err) {
            throw new Error(err)
        }
    }

    drawImage(): void {
        if (this.image) {
            this.context.drawImage(
                this.image,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            )
        }
    }

    drawFrameCounter(): void {
        this.context.font = "12px monospace"
        this.context.textBaseline = "top"
        this.context.fillStyle = "#ffffff"
        this.context.fillText(
            Math.round(this.frames.fps().avg).toString(),
            12,
            12,
        )
        this.context.fillText(
            Math.round(this.frames.fps().min).toString(),
            12,
            24,
        )
        this.context.fillText(
            Math.round(this.frames.fps().max).toString(),
            12,
            36,
        )
    }

    render = (): void => {
        requestAnimationFrame(this.render)

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.drawImage()
        this.drawFrameCounter()

        this.frames.next()
    }
}

export default FilterCanvas

