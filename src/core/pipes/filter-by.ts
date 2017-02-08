import {Pipe} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'filterBy'})
export class FilterByPipe {
    transform(data: any[], conditions: {[key: string]: any}) {
        return _.filter(data, conditions);
    }
}
