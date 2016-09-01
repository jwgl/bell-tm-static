import {Injectable} from '@angular/core';

import {ApiUrl, Rest, EditService} from '../../../core/http';

@Injectable()
export class ReissueFormService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}
