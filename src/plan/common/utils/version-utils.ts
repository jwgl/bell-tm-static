export function toVersionNumber(version: string): number {
    /* tslint:disable:no-bitwise */
    if (/^\d+(\.\d+){0,3}$/.test(version)) {
        return version.split('.').map(x => parseInt(x, 10)).reduce((acc, x, i) => acc += x << 8 * (3 - i), 0);
    } else {
        throw new Error(`Error version format: ${version}`);
    }
    /* tslint:enable:no-bitwise */
}

export function toVersionString(version: number): string {
    /* tslint:disable:no-bitwise */
    let a = version >> 24 & 255
      , b = version >> 16 & 255
      , c = version >>  8 & 255
      , d = version >>  0 & 255
      ;
    /* tslint:enable:no-bitwise */

    if (d !== 0) {
        return [a, b, c, d].join('.');
    } else if ( c !== 0) {
        return [a, b, c].join('.');
    } else {
        return [a, b].join('.');
    }
}
