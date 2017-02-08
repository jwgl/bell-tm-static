import {Pipe} from '@angular/core';

import {oddEvenLabel} from '../utils/odd-even';

@Pipe({name: 'oddEven'})
export class OddEvenPipe {
    transform(data: number) {
        return oddEvenLabel(data);
    }
}
