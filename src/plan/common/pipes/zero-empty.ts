import {Pipe} from 'angular2/core';

@Pipe({name: 'zeroEmpty'})
export class ZeroEmptyPipe {
    transform(value: any, args: any[]) {
        return value === 0 ? null : value;
    }
}
