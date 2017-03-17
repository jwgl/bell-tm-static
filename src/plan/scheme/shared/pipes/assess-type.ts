import {Pipe} from '@angular/core';

const ASSESS_TYPES: {[key: number]: string} = {
    1: '考试',
    2: '考查',
    3: '论文',
    9: '其它',
};


@Pipe({name: 'assessType'})
export class AssessTypePipe {
    transform(value: number) {
        return ASSESS_TYPES[value];
    }
}
