import {Injectable} from '@angular/core';

import {ApiUrl, Rest, EditService} from 'core/rest';

@Injectable()
export class ReissueOrderService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}
