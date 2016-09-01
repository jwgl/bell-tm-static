import {Observable} from 'rxjs/Observable';

import {ApiUrl} from './api-url';
import {Rest} from './rest';

export abstract class EditService {
    constructor(public rest: Rest, public api: ApiUrl) {}

    get userId(): string {
        return this.api.userId;
    }

    set userId(value: string) {
        this.api.userId = value;
    }

    loadList(): Observable<any> {
        return this.rest.get(this.api.list());
    }

    loadItem(id: string): Observable<any> {
        return this.rest.get(this.api.item(id));
    }

    loadDataForCreate(options: {[key: string]: any}): Observable<any> {
        return this.rest.get(this.api.dataForCreate(options));
    }

    loadItemForEdit(id: string): Observable<any> {
        return this.rest.get(this.api.itemForEdit(id));
    }

    loadItemForRevise(id: string): Observable<any> {
        return this.rest.get(this.api.itemForRevise(id));
    }

    create(value: any): Observable<string> {
        return this.rest.post(this.api.list(), value).map(data => data.id);
    }

    revise(value: any): Observable<string> {
        return this.rest.post(this.api.revise(), value).map(data => data.id);
    }

    update(value: any): Observable<string> {
        return this.rest.put(this.api.item(value.id), value).map(res => value.id);
    }

    delete(id: string): Observable<string> {
        return this.rest.delete(this.api.item(id)).map(res => id);
    }
}
