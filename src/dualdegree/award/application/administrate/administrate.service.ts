import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ReviewService} from 'core/rest';

@Injectable()
export class ApplicationsAdministrateService extends ReviewService {
    list: any[];

    constructor(
        rest: Rest,
        api: ApiUrl) {
        super(rest, api);
    }

    loadApplicationItem(id: any, options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(`${this.api.list()}/${options.awardId}/applications/${id}`);
    }

    loadApplicationList(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(`${this.api.list()}/${options.awardId}/applications`);
    }
}
