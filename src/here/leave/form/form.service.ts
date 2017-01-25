import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, EditService} from 'core/rest';

@Injectable()
export class LeaveFormService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}