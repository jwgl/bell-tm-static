import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class ObservationFormService extends EditService {
    list: any[];

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    cancel(id: number): Observable<any> {
        return this.rest.patch(`${this.api.item(id)}?op=CANCEL`, {});
    }

    submit(id: number): Observable<any> {
         return this.rest.patch(`${this.api.item(id)}?op=SUBMIT`, {});
    }

    saveInIdle(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    feed(id: number): Observable<any> {
         return this.rest.patch(`${this.api.item(id)}?op=FINISH`, {});
    }
}
