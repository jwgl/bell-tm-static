import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class AwardViewService extends EditService {
    list: any[];

    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('AWARD_API_URL') private awardApiUrl: string) {
        super(rest, api);
    }

    loadItem(id: any): Observable<any> {
        return this.rest.get(`${this.awardApiUrl}/${id}`);
    }
}
