import { Pipe } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'pager' })
export class PagerPipe {
    transform(data: any[], args: any) {
        return  _.slice(data, args.offs, args.offs + args.max);
    }
}
