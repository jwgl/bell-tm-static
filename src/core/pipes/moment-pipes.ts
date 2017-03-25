import {Pipe} from '@angular/core';
import * as moment from 'moment';
moment.locale('zh-cn');
@Pipe({name: 'fromNow'})
export class FromNowPipe {
    transform(value: any, args: any[]) {
        return moment(value).fromNow();
    }
}
