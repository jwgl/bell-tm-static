import {Injectable} from 'angular2/core';

import {ApiUrl, Rest, Observable} from '../../../core/http';

@Injectable()
export class SchemeDraftService {
    constructor(private rest: Rest, private api: ApiUrl) {}

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

    loadItemForEdit(id: string): Observable<any> {
        return this.rest.get(this.api.itemForEdit(id));
    }

    loadItemForRevise(id: string): Observable<any> {
        return this.rest.get(this.api.itemForRevise(id));
    }

    loadDataForCreate(program: string): Observable<any> {
        return this.rest.get(this.api.dataForCreate({program}));
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

    findCourses(query: string): Observable<any> {
        return this.rest.get(`${this.api.list()}/courses?q=${query}`);
    }

    commit(id: string, title: string, to: string, comment: string): Observable<any> {
        return this.rest.patch(this.api.commit(id), {title, to, comment});
    }

    getCheckersUrl(id: string): string {
        return this.api.checkers(id);
    }
}
