import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class PublicService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadLegacyItem(id: number): Observable<any> {
        return this.rest.get(`${this.api.list()}/legacyshow?id=${id}`);
    }
}
