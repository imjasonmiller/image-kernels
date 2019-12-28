export type Kernel = number[]

export const gaussianKernel1D = (sigma: number): Kernel => {
    // Sigma is tied to radius, so it can not be <= 0
    if (sigma <= 0) throw new RangeError("sigma should be > 0")

    const radius = Math.ceil(sigma) * 3
    const kernel = new Array(radius * 2 + 1).fill(0)

    for (let x = -radius, col = 0; x <= radius; x++, col++) {
        const val = Math.exp(-(x ** 2) / (2 * sigma ** 2))
        kernel[col] = val
    }

    // Normalize values
    const sum = kernel.reduce((a, b) => a + b, 0)
    return kernel.map(val => val / sum)
}

export const gaussianKernel2D = (sigma: number): Kernel => {
    // Sigma is tied to radius, so it can not be <= 0
    if (sigma <= 0) throw new RangeError("sigma should be > 0")

    const radius = Math.ceil(sigma) * 3
    const kernel = new Array((radius * 2 + 1) ** 2).fill(0)

    for (let x = -radius, col = 0; x <= radius; x++, col++) {
        for (let y = -radius, row = 0; y <= radius; y++, row++) {
            const val = Math.exp(-(x ** 2 + y ** 2) / (2 * sigma ** 2))
            kernel[col + row * (radius * 2 + 1)] = val
        }
    }

    // Normalize values
    const sum = kernel.reduce((a, b) => a + b, 0)
    return kernel.map(val => val / sum)
}

