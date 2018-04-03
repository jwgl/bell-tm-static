import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class PaperFormService extends EditService {

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadPaperForm(id: number): Observable<any> {
        return this.rest.get(`${this.api.item(id)}/papers`);
    }

    createPaperForm(id: number, value: any): Observable<string> {
        return this.rest.post(`${this.api.item(id)}/papers`, value).map(data => data.id);
    }
}
