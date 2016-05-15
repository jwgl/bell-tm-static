import {Pipe} from '@angular/core';
import {groupBy} from '../utils/group-by';

@Pipe({name: 'groupBy'})
export class GroupByPipe {
    transform(data: any, conditions: any[]) {
        groupBy(data, conditions);
    }
}
