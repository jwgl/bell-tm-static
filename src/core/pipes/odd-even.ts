import {Pipe} from '@angular/core';

import {oddEvenText} from '../utils/odd-even';

@Pipe({name: 'oddEven'})
export class OddEvenPipe {
    transform(data: number) {
        return oddEvenText(data);
    }
}
