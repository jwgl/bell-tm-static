import {Pipe} from '@angular/core';

const OddEven = ['', '单', '双'];

@Pipe({name: 'oddEven'})
export class OddEvenPipe {
    transform(data: number) {
        return OddEven[data];
    }
}
