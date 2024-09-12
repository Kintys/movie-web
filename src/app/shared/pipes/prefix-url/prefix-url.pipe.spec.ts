import { PrefixUrlPipe } from './prefix-url.pipe'

describe('PrefixUrlPipe', () => {
    let pipe: PrefixUrlPipe

    beforeEach(() => {
        pipe = new PrefixUrlPipe()
    })

    it('create an instance', () => {
        expect(pipe).toBeTruthy()
    })

    it('should transform a valid URL segment', () => {
        const value = 'test.jpg'
        const result = pipe.transform(value)
        expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg')
    })

    it('should return an empty string if value is an empty string', () => {
        const value = ''
        const result = pipe.transform(value)
        expect(result).toBe('')
    })
})
