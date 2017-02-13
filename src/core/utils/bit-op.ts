/* tslint:disable:no-bitwise */
export function getBit(value: number, index: number): boolean {
    return (value & 1 << index) !== 0;
}

export function setBit(value: number, index: number): number {
    return value | 1 << index;
}

export function clearBit(value: number, index: number): number {
    return value & ~(1 << index);
}

export function toggleBit(value: number, index: number): number {
    return value ^ 1 << index;
}
