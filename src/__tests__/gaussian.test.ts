import { gaussianKernel1D, gaussianKernel2D } from "./../gaussian"

describe("gaussianKernel2D", () => {
    it("should error on a value equal or less than 0", () => {
        expect(() => gaussianKernel2D(0)).toThrow(RangeError)
        expect(() => gaussianKernel2D(-1)).toThrow(RangeError)
    })

    it("should return the correct values", () => {
        const result = gaussianKernel2D(0.84089642)

        // https://en.wikipedia.org/wiki/Gaussian_blur#Sample_Gaussian_matrix
        // prettier-ignore
        const fixture = [
            0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067,
            0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
            0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
            0.00038771,	0.01330373,	0.11098164,	0.22508352,	0.11098164,	0.01330373,	0.00038771,
            0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
            0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
            0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067
        ]

        fixture.forEach((value, i) => expect(result[i]).toBeCloseTo(value, 5))
    })
})

describe("gaussianKernel1D", () => {
    it("should error on a value equal or less than 0", () => {
        expect(() => gaussianKernel1D(0)).toThrow(RangeError)
        expect(() => gaussianKernel1D(-1)).toThrow(RangeError)
    })

    it("should return the correct values", () => {
        const result = gaussianKernel1D(0.84089642)
        // const result = gaussianKernel1D(1)

        // https://en.wikipedia.org/wiki/Gaussian_blur#Sample_Gaussian_matrix
        // prettier-ignore
        const fixture = [
            0.00081721, 0.02804152, 0.23392642, 0.47442967, 0.23392642, 0.02804152, 0.00081721
        ]

        fixture.forEach((value, i) => expect(result[i]).toBeCloseTo(value, 5))
    })
})
