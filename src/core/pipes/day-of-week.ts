import {Pipe} from '@angular/core';
import {dayOfWeekText} from '../utils/day-of-week';

@Pipe({name: 'dayOfWeek'})
export class DayOfWeekPipe {
    transform(value: number, type: number) {
        switch (type) {
            case 1:
                return dayOfWeekText(value);
            case 2:
                return `周${dayOfWeekText(value)}`;
            default:
                return `星期${dayOfWeekText(value)}`;
        }
    }
}
