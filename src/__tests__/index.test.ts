import { getCanvasElement } from "./../index"

describe("canvas", () => {
    it("should find a canvas element", () => {
        document.body.innerHTML = `
            <canvas id="selector"></canvas>
        `

        const result = getCanvasElement("#selector")

        expect(result).toBeInstanceOf(HTMLCanvasElement)
    })

    it("should throw on an invalid selector", () => {
        document.body.innerHTML = `
            <canvas id="selector"></canvas>
        `

        expect(() => getCanvasElement("#invalid")).toThrow(TypeError)
    })
})
