import {oddEvenText} from './odd-even';

export interface SectionRange {
    startSection: number;
    totalSection: number;
}

export function sectionRangeText(sectionRange: SectionRange): string {
    return sectionRange.totalSection === 1
        ? `第${sectionRange.startSection}节`
        : `${sectionRange.startSection}-${sectionRange.startSection + sectionRange.totalSection - 1}节`;
}
