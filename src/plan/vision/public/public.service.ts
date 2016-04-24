import {Injectable} from 'angular2/core';

import {ApiUrl, Rest, Observable} from '../../../core/http';
import {Vision} from '../common/vision.model';

@Injectable()
export class VisionPublicService {
    constructor(private rest: Rest, private api: ApiUrl) {
    }

    getList(): Observable<any> {
        return this.rest.get(this.api.list());
    }

    getItem(id: string): Observable<any> {
        return this.rest.get(this.api.item(id)).map(dto => new Vision(dto));
    }
}
