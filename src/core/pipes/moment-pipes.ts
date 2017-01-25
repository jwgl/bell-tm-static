import {Pipe} from '@angular/core';
import * as moment from 'moment';
moment.locale('zh-cn');
@Pipe({name: 'fromNow'})
export class FromNowPipe {
    transform(value: any, args: any[]) {
        return moment(value).fromNow();
    }
}

@Pipe({name: 'moment'})
export class MomentFormatPipe {
    transform(value: any, args: any[]) {
        let format: string;

        if (args && args[0]) {
            format = args[0];
        } else {
            format = `YYYY-MM-DD HH:mm:ss`;
        }

        return moment(value).format(format);
    }
}

@Pipe({name: 'dayOfWeek'})
export class DayOfWeekPipe {
    transform(value: number) {
        return moment.weekdays(value);
    }
}
