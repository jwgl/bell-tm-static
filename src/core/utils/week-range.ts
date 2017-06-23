import * as _ from 'lodash';
import {oddEvenText} from './odd-even';

export interface WeekRange {
    startWeek: number;
    endWeek: number;
    oddEven: number;
}

/**
 * 周区间字符串形式，如第1周、1-17周、1-17单周。
 */
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

/**
 * 多个周区间的字符串形式。如果weekRanges只包含一个区间，使用weekRangeText进行格式化；
 * 如果weekRanges超过一个区间，采用如下形式：1-2,3,4-10单,10-17周。
 */
export function multipleWeekRangesText(weekRanges: WeekRange[]): string {
    if (weekRanges.length === 1) {
        return weekRangeText(weekRanges[0]);
    } else {
        return _.chain(weekRanges).map(it => {
            if (it.startWeek === it.endWeek) {
                return `${it.startWeek}`;
            } else {
                if (it.oddEven === 0) {
                    return `${it.startWeek}-${it.endWeek}`;
                } else {
                    return `${it.startWeek}-${it.endWeek}${oddEvenText(it.oddEven)}`;
                }
            }
        }).uniq().join(',') + '周';
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
