export const getCanvasElement = (elem: string): HTMLCanvasElement => {
    const canvas = document.querySelector(elem)

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new TypeError(`"${elem}" is not an instance of HTMLCanvasElement`)
    }

    return canvas
}
