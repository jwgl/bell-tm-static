import {Pipe} from '@angular/core';

import {numberToChinese} from 'core/utils';

@Pipe({name: 'termName'})
export class SchemeTermNamePipe {
    transform(value: number) {
        if (value < 16) {
            return `第${numberToChinese(value)}学期`;
        } else {
            return `小学期${value - 16}`;
        }
    }
}

@Pipe({name: 'termTitle'})
export class SchemeTermTitlePipe {
    transform(value: number) {
        if (value < 16) {
            return numberToChinese(value);
        } else {
            return `小${value - 16}`;
        }
    }
}
