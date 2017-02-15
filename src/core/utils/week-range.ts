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
            return `${weekRange.startWeek}-${weekRange.endWeek}周（${oddEvenText(weekRange.oddEven)}）`;
        }
    }
}
