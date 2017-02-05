import {Injectable} from '@angular/core';

import {ApiUrl, Rest, ReviewService} from 'core/rest';

@Injectable()
export class LeaveApprovalService extends ReviewService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}
