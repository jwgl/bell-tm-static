const OddEven = ['', '单', '双'];

export function matchOddEven(oddEven: number, week: number): boolean {
    return oddEven === 0 ||
           oddEven === 1 && week % 2 === 1 ||
           oddEven === 2 && week % 2 === 0;
}

export function oddEvenText(value: number) {
    if (value >= 1 && value <= 2) {
        return OddEven[value];
    } else {
        return '';
    }
}
