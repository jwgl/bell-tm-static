import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class FinderService extends ShowService {

    constructor(
        rest: Rest,
        api: ApiUrl) {
        super(rest, api);
    }
}
