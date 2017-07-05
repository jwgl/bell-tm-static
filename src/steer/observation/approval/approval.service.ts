import { Injectable } from '@angular/core';

import { ApiUrl, EditService, Rest } from 'core/rest';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApprovalService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
    feed(id: number): Observable<any> {
         return this.rest.patch(`${this.api.item(id)}?op=FINISH`, {});
    }
}
