import {Observable} from 'rxjs/Observable';

import {ApiUrl} from './api-url';
import {Rest} from './rest';

export abstract class EditService {
    constructor(public rest: Rest, public api: ApiUrl) {}

    loadList(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.list(options));
    }

    loadItem(id: any): Observable<any> {
        return this.rest.get(this.api.item(id));
    }

    loadDataForCreate(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.dataForCreate(options));
    }

    loadItemForEdit(id: any): Observable<any> {
        return this.rest.get(this.api.itemForEdit(id));
    }

    loadItemForRevise(id: any): Observable<any> {
        return this.rest.get(this.api.itemForRevise(id));
    }

    create(value: any): Observable<string> {
        return this.rest.post(this.api.list(), value).map(data => data.id);
    }

    revise(value: any): Observable<string> {
        return this.rest.post(this.api.revise(), value).map(data => data.id);
    }

    update(id: any, value: any): Observable<string> {
        return this.rest.put(this.api.item(id), value).map(res => id);
    }

    delete(id: any): Observable<string> {
        return this.rest.delete(this.api.item(id)).map(res => id);
    }
}
