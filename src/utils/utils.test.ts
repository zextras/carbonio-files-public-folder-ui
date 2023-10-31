import {describe, expect, it} from "vitest";
import {humanFileSize} from "./utils.ts";

describe('utils', () => {
    describe('humanFileSize function', () => {
        it('should return 0 B if input is 0', () => {
            const result = humanFileSize(0);
            expect(result).toBe('0 B');
        });

        it('should return x if input is max safe integer', () => {
            const result = humanFileSize(Number.MAX_SAFE_INTEGER);
            expect(result).toBe('8.00 PB')
        });

        it.each([['B', 0], ['KB', 1],  ['MB', 2], ['GB', 3], ['TB', 4], ['PB', 5], ['EB', 6], ['ZB', 7], ['YB', 8]])('should return %s unit if input pow is %s', (unit, pow) => {
            const result = humanFileSize(1024 ** pow);
            expect(result).toBe(`1.00 ${unit}`)
        })

        it.each([['B', 1], ['KB', 2],  ['MB', 3], ['GB', 4], ['TB', 5], ['PB', 6], ['EB', 7], ['ZB', 8]])('should return %s unit measure if input is one unit lower than the next unit measure', (unit, pow) => {
            const result = humanFileSize(1024 ** pow - (1024 ** (pow-1)));
            expect(result).toBe(`1023.00 ${unit}`)
        })

        it('should change unit from KB to B when removing 1 B from 1024 B', () => {
            expect(humanFileSize(1024 - 1)).toBe('1023.00 B');
        });

        it.each([['KB', 2],  ['MB', 3], ['GB', 4]])('should return 1024.00 %s if input is 1024 ** %s - 1', (unit, pow) => {
            const result = humanFileSize(1024 ** pow - 1 );
            expect(result).toBe(`1024.00 ${unit}`)
        })

        it.each([['PB', 5], ['EB', 6], ['ZB', 7], ['YB', 8]])('should return %s unit if input pow is %s - 1B', (unit, pow) => {
            const result = humanFileSize(1024 ** pow - 1 );
            expect(result).toBe(`1.00 ${unit}`)
        })

        it('should throw an error if inputSize is equal or greater than 1024 YB', () => {
            expect(() => humanFileSize(1024 ** 9)).toThrow('Unsupported inputSize')
        });

    });
});

