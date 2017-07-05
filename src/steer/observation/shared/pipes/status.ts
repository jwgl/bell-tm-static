import { Pipe } from '@angular/core';

import { StatusText } from '../constant';

@Pipe({ name: 'statusName' })
export class StatusTextPipe {
    transform(value: number) {
        const statusText: string[] = StatusText;
        return (value == null || value > 2) ? null : statusText[value];
    }
}
