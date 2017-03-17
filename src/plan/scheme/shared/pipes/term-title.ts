import {Pipe} from '@angular/core';

import {numberToChinese} from 'core/utils';

@Pipe({name: 'termTitle'})
export class TermTitlePipe {
    transform(value: number) {
        if (value < 16) {
            return numberToChinese(value);
        } else {
            return `小${value - 16}`;
        }
    }
}
