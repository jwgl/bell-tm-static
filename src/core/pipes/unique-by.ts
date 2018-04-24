import {Pipe} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'uniqueBy'})
export class UniqueByPipe {
    transform(list: any[], key: string) {
        return _.chain(list)
                .map(data => data[key])
                .uniq()
                .sort()
                .value();
    }
}
