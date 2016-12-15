import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'fromNow'})
export class FromNowPipe {
    constructor() {
        moment.locale('zh-cn');
    }

    transform(value: any, args: any[]) {
        return moment(value).fromNow();
    }
}

@Pipe({name: 'moment'})
export class MomentFormatPipe {
    constructor() {
        moment.locale('zh-cn');
    }

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
    constructor() {
        moment.locale('zh-cn');
    }

    transform(value: number) {
        return moment.weekdays(value);
    }
}
