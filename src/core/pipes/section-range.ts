import {Pipe} from '@angular/core';
import {SectionRange, sectionRangeText} from '../utils/section-range';

@Pipe({name: 'sectionRange'})
export class SectionRangePipe {
    transform(value: SectionRange) {
        return sectionRangeText(value);
    }
}
