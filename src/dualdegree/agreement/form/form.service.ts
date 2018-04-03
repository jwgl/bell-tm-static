import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class AgreementFormService extends EditService {
    list: any[];

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }
}
