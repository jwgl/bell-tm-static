import {Injectable, Inject, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';
import {Vision} from '../common/vision.model';

@Injectable()
export class VisionDraftService {
    itemId: string;

    constructor(
        private rest: Rest,
        private api: ApiUrl,
        @Optional() @Inject('API_URL_IMPORT') private importUrl: string
    ) {}

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

    loadItemForEdit(id: string): Observable<Vision> {
        return this.rest.get(this.api.itemForEdit(id))
            .map(vision => new Vision(vision));
    }

    loadItemForRevise(id: string): Observable<Vision> {
        return this.rest.get(this.api.itemForRevise(id))
            .map(vision => new Vision(vision));
    }

    loadDataForCreate(program: string): Observable<any> {
        return this.rest.get(this.api.dataForCreate({program}))
            .map(vision => new Vision(vision));
    }

    loadDataForImport(id: string): Observable<any> {
        return this.rest.get(`${this.importUrl}/${id}`);
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
