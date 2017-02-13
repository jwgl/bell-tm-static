import {Injectable} from '@angular/core';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class ReissueOrderService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    receive(id: string, formId: number, received: boolean) {
        return this.rest.patch(`${this.api.item(id)}`, {type: 'RECEIVE', formId, received});
    }

    receiveAll(id: string, received: boolean) {
        return this.rest.patch(`${this.api.item(id)}`, {type: 'RECEIVE_ALL', received});
    }
}
