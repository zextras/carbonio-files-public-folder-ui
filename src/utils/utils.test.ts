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
            expect(result).toBe('')
        });

        it('should return X if input is Y', () => {
            const result = humanFileSize(1024);
            expect(result).toBe('1.00 KB')
        })
    });
});

