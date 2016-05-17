import {Pipe} from '@angular/core';

const SCHEME_TYPES = ['', '辅修', '专升本'];

@Pipe({name: 'programType'})
export class ProgramTypePipe {
    transform(type: any, showPrimary: boolean) {
        if (showPrimary && type === 0) {
            return '主修';
        } else {
            return SCHEME_TYPES[type];
        }
    }
}

export function getProgramType(type: number) {
    return SCHEME_TYPES[type];
}
