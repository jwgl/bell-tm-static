import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, Rest, ShowService } from 'core/rest';

@Injectable()
export class AgreementViewService extends ShowService {
    filters: any;

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    getCn(agreementId: number, majorId: number): Observable<any> {
        return this.rest.get(`${this.api.item(agreementId)}/getMajorOptionCn?majorId=${majorId}`);
    }
}
