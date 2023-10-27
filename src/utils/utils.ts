/**
 * Format a size in byte as human-readable
 */
export const humanFileSize = (inputSize: number): string => {
    if (inputSize === 0) {
        return '0 B';
    }
    const i = Math.floor(Math.log(inputSize) / Math.log(1024));
    return `${(inputSize / 1024 ** i).toFixed(2).toString()} ${['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]}`;
};