const SCHEME_TYPES = ['', '辅修', '专升本'];

export function getProgramType(type: number) {
    return SCHEME_TYPES[type];
}
