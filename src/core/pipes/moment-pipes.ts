import {Pipe} from '@angular/core';

let moment = (<any>window).moment;

@Pipe({name: 'fromNow'})
export class FromNowPipe {
    constructor() {
        moment.locale('zh-cn');
    }

    transform(value: any, args: any[]) {
        return moment(value).fromNow();
    }
}

@Pipe({name: 'momentFormat'})
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
