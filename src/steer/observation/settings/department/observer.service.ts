import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class ObserverService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    findTeacher(value: string): Observable<any> {
        return this.rest.get(`${this.api.list()}/teachers?q=${encodeURIComponent(value)}`);
    }

    observerReport(): Observable<any> {
        return this.rest.get(`${this.api.list()}/countByObserver`);
    }
}
