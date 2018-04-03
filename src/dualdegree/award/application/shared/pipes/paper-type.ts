import {Pipe} from '@angular/core';

import {paperTypeLabels} from '../constant';

@Pipe({ name: 'typeLabel' })
export class TypeTextPipe {
    transform(value: number) {
        const types = paperTypeLabels;
        return types.filter(item => item.id === value).map(data => data.label);
    }
}
