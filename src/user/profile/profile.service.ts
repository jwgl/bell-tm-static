import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class UserProfileService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    updateUser(dto: any): Observable<void> {
        return this.rest.put(this.api.list(), dto);
    }
}
