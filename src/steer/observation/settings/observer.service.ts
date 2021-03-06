import { Injectable } from '@angular/core';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class ObserverService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }
}
