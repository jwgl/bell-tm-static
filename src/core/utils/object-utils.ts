export function equalsTo<T>(a: T, b: T): boolean {
    let keys = Object.keys(a);
    for (let i = 0; i < keys.length; i++) {
        if (a[keys[i]] !== b[keys[i]]) {
            return false;
        }
    }
    return true;
}
