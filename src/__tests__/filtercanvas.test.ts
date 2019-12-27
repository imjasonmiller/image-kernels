import { getCanvasElement, loadImage } from "./../filtercanvas"

describe("FilterCanvas", () => {
    beforeAll(() => (document.body.innerHTML = `<canvas id="canvas"></canvas>`))

    it("should find a canvas element", () => {
        expect(getCanvasElement("#canvas")).toBeInstanceOf(HTMLCanvasElement)
    })

    it("should throw on an invalid selector", () => {
        expect(() => getCanvasElement("#invalid")).toThrow(TypeError)
    })
})

describe("loadImage", () => {
    const originalImageFn = Object.getOwnPropertyDescriptor(
        Image.prototype,
        "src",
    ) as PropertyDescriptor

    beforeAll(() => {
        const LOAD_SUCCESS = "image-success.png"

        Object.defineProperty(Image.prototype, "src", {
            set(src) {
                if (src === LOAD_SUCCESS) {
                    setTimeout(() => this.dispatchEvent(new Event("load")))
                } else {
                    setTimeout(() => this.dispatchEvent(new Event("error")))
                }
            },
        })
    })

    afterAll(() => {
        Object.defineProperty(Image.prototype, "src", originalImageFn)
    })

    it("should load if imgUrl is valid", async () => {
        await expect(loadImage("image-success.png")).resolves.toBeInstanceOf(
            HTMLImageElement,
        )
    })

    it("should error if imgUrl is invalid", async () => {
        await expect(loadImage("image-error.png")).rejects.toThrow(
            "image could not be loaded",
        )
    })
})
