import {NORMAL_TERM_WEEKS, SHORT_TERM_WEEKS} from 'core/constants';

export function getPeriodWeeks(term: number) {
    return term >= 17 ? SHORT_TERM_WEEKS : NORMAL_TERM_WEEKS;
}

export function buildPeriodWeeksOptions(term: number): Array<{label: string, value: number}> {
    const weeks = this.getPeriodWeeks(term);
    const periodWeekOptions = [] as Array<{label: string, value: number}>;
    periodWeekOptions.push({label: `全学期（${weeks}周）`, value: weeks});
    periodWeekOptions.push({label: `半学期（${weeks / 2}周）`, value: weeks / 2 });
    for (let i = 1; i <= weeks; i++) {
        if (i !== weeks && i !== weeks / 2) {
            periodWeekOptions.push({label: `${i}周`, value: i});
        }
    }
    return periodWeekOptions;
}
