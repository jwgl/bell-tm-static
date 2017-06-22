import * as _ from 'lodash';
import {oddEvenText} from './odd-even';

export interface WeekRange {
    startWeek: number;
    endWeek: number;
    oddEven: number;
}

export function weekRangeText(weekRange: WeekRange): string {
    if (weekRange.startWeek === weekRange.endWeek) {
        return `第${weekRange.startWeek}周`;
    } else {
        if (weekRange.oddEven === 0) {
            return `${weekRange.startWeek}-${weekRange.endWeek}周`;
        } else {
            return `${weekRange.startWeek}-${weekRange.endWeek}${oddEvenText(weekRange.oddEven)}周`;
        }
    }
}

export function multipleWeekRangesText(weekRanges: WeekRange[]): string {
    if (weekRanges.length === 1) {
        return weekRangeText(weekRanges[0]);
    } else {
        return weekRanges.map(it => {
            if (it.startWeek === it.endWeek) {
                return `${it.startWeek}`;
            } else {
                if (it.oddEven === 0) {
                    return `${it.startWeek}-${it.endWeek}`;
                } else {
                    return `${it.startWeek}-${it.endWeek}${oddEvenText(it.oddEven)}`;
                }
            }
        }).join(',') + '周';
    }
}

/**
 * 判断两个WeekRange是否冲突
 */
export function weekRangeConflict(wr1: WeekRange, wr2: WeekRange) {
    return _.intersection(weekRangeToArray(wr1), weekRangeToArray(wr2)).length > 0;
}

/**
 * WeekRange转换为数组
 */
export function weekRangeToArray(weekRange: WeekRange) {
    return _.range(weekRange.startWeek, weekRange.endWeek + 1).filter(w => {
        return weekRange.oddEven === 0
             ? true
             : weekRange.oddEven === 1
             ? w % 2 === 1
             : weekRange.oddEven === 2
             ? w % 2 === 0
             : false;
    });
}
