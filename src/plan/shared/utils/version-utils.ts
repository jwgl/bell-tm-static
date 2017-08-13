/* tslint:disable:no-bitwise */
export function toVersionNumber(version: string): number {
    if (/^\d+(\.\d+){0,3}$/.test(version)) {
        return version.split('.').map(x => parseInt(x, 10)).reduce((acc, x, i) => acc += x << 8 * (3 - i), 0);
    } else {
        throw new Error(`Error version format: ${version}`);
    }
}

export function toVersionString(version: number): string {
    const a = version >> 24 & 255;
    const b = version >> 16 & 255;
    const c = version >>  8 & 255;
    const d = version >>  0 & 255;

    if (d !== 0) {
        return [a, b, c, d].join('.');
    } else if (c !== 0) {
        return [a, b, c].join('.');
    } else {
        return [a, b].join('.');
    }
}
