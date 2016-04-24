import {Pipe} from 'angular2/core';
import {numberToChinese} from '../../../core/utils';

@Pipe({name: 'termName'})
export class SchemeTermNamePipe {
    transform(value: any, args: any[]) {
        if (value < 16) {
            return `第${numberToChinese(value)}学期`;
        } else {
            return `小学期${value - 16}`;
        }
    }
}

@Pipe({name: 'termTitle'})
export class SchemeTermTitlePipe {
    transform(value: any, args: any[]) {
        if (value < 16) {
            return numberToChinese(value);
        } else {
            return `小${value - 16}`;
        }
    }
}
