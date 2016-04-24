import {Pipe} from 'angular2/core';

const SCHEME_TYPES = ['', '辅修', '专升本'];

@Pipe({name: 'programType'})
export class ProgramTypePipe {
    transform(type: any, args: any[]) {
        return SCHEME_TYPES[type];
    }
}

export function getProgramType(type: number) {
    return SCHEME_TYPES[type];
}
