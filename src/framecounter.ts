type State = {
    avg: number
    min: number
    max: number
}

class FrameCounter {
    frames: number[]
    samples: number

    curr: number
    prev: number

    state: State

    constructor(samples: number) {
        this.frames = []

        if (samples <= 0) {
            throw new RangeError("samples should be greater than 0")
        }

        this.samples = samples

        this.prev = performance.now()
        this.curr = performance.now()

        this.state = { avg: 0, min: 0, max: 0 }
    }

    private setState(avg: number, min: number, max: number): void {
        this.state = { avg, min, max }
    }

    next(): void {
        const curr = performance.now()

        if (this.frames.length === this.samples) {
            const sum = this.frames.reduce((a, b) => a + b, 0)
            const avg = 1000 / (sum / this.frames.length)
            const min = Math.min(...this.frames)
            const max = Math.max(...this.frames)

            this.setState(avg, min, max)
            this.frames = []
        } else {
            const time = curr - this.prev
            this.frames.push(time)
        }

        this.prev = curr
    }

    fps(): State {
        return { avg: this.state.avg, min: this.state.min, max: this.state.max }
    }
}

export default FrameCounter

