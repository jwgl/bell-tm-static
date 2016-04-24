import {Injectable, Inject, Optional} from 'angular2/core';

import {groupBy} from '../../../core/pipes';
import {ApiUrl, Rest, Observable, API_URL_FIELDS} from '../../../core/http';
import {Vision} from '../common/vision.model';

@Injectable()
export class VisionDraftService {
    itemId: string;

    constructor(
        private rest: Rest,
        private api: ApiUrl,
        @Optional() @Inject(API_URL_FIELDS) private fieldUrl: string,
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

    getFields(): Observable<any> {
        return this.rest.get(this.fieldUrl)
            .map(values => groupBy(values, [{
                groupBy: 'fieldClass',
                into: 'fields',
                mappings: {
                    discipline: 'discipline',
                    fieldClass: 'name',
                },
            }]));
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

    commit(id: string, title: string, to: string, comment: string): Observable<any> {
        return this.rest.patch(this.api.commit(id), {title, to, comment});
    }

    getCheckerUrl(id: string): string {
        return this.api.checkers(id);
    }
 }
