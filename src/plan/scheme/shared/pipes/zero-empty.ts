import {Pipe} from '@angular/core';

@Pipe({name: 'zeroEmpty'})
export class ZeroEmptyPipe {
    transform(value: any, args: any[]) {
        return value === 0 ? null : value;
    }
}
