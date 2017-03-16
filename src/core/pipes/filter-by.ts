import {Pipe} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'filterBy'})
export class FilterByPipe {
    transform(data: any[], predicate: (item: any) => boolean) {
        return _.filter(data, predicate);
    }
}
