import { Pipe } from '@angular/core';

@Pipe({ name: 'termLabel' })
export class TermTextPipe {
    transform(value: number) {
        const year = Math.floor(value / 10);
        return `${year}-${year + 1}学年 第${value % 10}学期`;
    }
}
