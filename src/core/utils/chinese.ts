const DIGITS = '零一二三四五六七八九';
const UNITS = '十百千万十百千亿';

export function numberToChinese(num: number): string {
    // 优化小于100的数
    if (num < 0) {
        return('负' + numberToChinese(-num));
    } else if (num < 10) {
        return DIGITS[num];
    } else if (num < 100) {
        let result = (num < 20 ? '' : DIGITS[Math.floor(num / 10)]) + '十';
        if (num % 10 > 0) {
            result +=  DIGITS[num % 10];
        }
        return result;
    }

    // 大于100
    const str = num.toString();
    let result = DIGITS[parseInt(str[str.length - 1], 10)];

    for (let i = str.length - 2; i >= 0; i--) {
        result = DIGITS[parseInt(str[i], 10)] + UNITS[(str.length - i - 2) % (UNITS.length)] + result;
    }

    result = result
        .replace(/(零[十百千])+/g, '零')
        .replace(/零+([万亿])/g, '$1')
        .replace(/零+$/, '');
    return result;
}
