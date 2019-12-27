import FrameCounter from "./../framecounter"

describe("framecounter", () => {
    it("should create an instance of framecounter", () => {
        const result = new FrameCounter(1)

        expect(result).toBeInstanceOf(FrameCounter)
    })

    it("should throw if 'samples' is zero", () => {
        expect(() => new FrameCounter(0)).toThrow(RangeError)
    })

    it("should throw if 'samples' is negative", () => {
        expect(() => new FrameCounter(-256)).toThrow(RangeError)
    })

    it("should return the correct fps", () => {
        /**
         * TODO: <Jason> Test does too many things at once, write smaller units
         * To make Performance.now() behave deterministically
         * it is mocked to increment by 10 ms on each call
         */
        const spy = jest.spyOn(performance, "now").mockImplementation(
            ((): (() => number) => {
                let time = 0

                const fn = (): number => {
                    time += 10
                    return time
                }

                return fn
            })(),
        )

        const instance = new FrameCounter(4)

        expect(instance.prev).toBe(10)
        expect(instance.samples).toBe(4)
        expect(instance.curr).toBe(20)

        expect(spy).toHaveReturnedWith(20)

        expect(instance.fps()).toStrictEqual({ avg: 0, min: 0, max: 0 })

        expect(instance.frames).toStrictEqual([])

        instance.next()

        expect(instance.frames).toStrictEqual([20])

        instance.next()

        expect(instance.frames).toStrictEqual([20, 10])

        instance.next()

        expect(instance.frames).toStrictEqual([20, 10, 10])

        instance.next()

        expect(instance.frames).toStrictEqual([20, 10, 10, 10])

        instance.next()

        expect(instance.fps()).toStrictEqual({ avg: 80, min: 10, max: 20 })

        expect(spy).toHaveBeenCalledTimes(7)

        spy.mockRestore()
    })
})
