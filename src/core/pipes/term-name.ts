import {Pipe} from '@angular/core';

@Pipe({name: 'termName'})
export class TermNamePipe {
    transform(termId: number, format: string) {
        const year = Math.floor(termId / 10);
        const term = termId % 10;
        if (format === 'short') {
            return `${year}-${year + 1}-${term}`;
        } else {
            return `${year}-${year + 1}学年第${term}学期`;
        }
    }
}
