export function matchOddEven(oddEven: number, week: number): boolean {
    return oddEven === 0 ||
           oddEven === 1 && week % 2 === 1 ||
           oddEven === 2 && week % 2 === 0;
}