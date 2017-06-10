import {Injectable} from '@angular/core';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class SchemeDepartmentService extends ShowService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadToes(id: string) {
        return this.rest.get(`${this.api.item(id)}/toes`);
    }

    saveToes(id: string, toesDto: any) {
        return this.rest.post(`${this.api.item(id)}/toes`, toesDto);
    }
}
