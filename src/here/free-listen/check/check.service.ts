import {Injectable} from '@angular/core';

import {ApiUrl, Rest, ReviewService} from 'core/rest';

@Injectable()
export class FreeListenCheckService extends ReviewService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}
