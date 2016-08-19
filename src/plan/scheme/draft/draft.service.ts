import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from '../../../core/http';
import {SchemeCourseDto} from '../common/scheme.model';

@Injectable()
export class SchemeDraftService {
    private publicSchemeApi: ApiUrl;
    constructor(
        private rest: Rest,
        private api: ApiUrl,
        @Inject('PUBLIC_SCHEME_URL') publicSchemeUrl: string) {
        this.publicSchemeApi = new ApiUrl(publicSchemeUrl);
    }

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

    loadPropertyCourses(id: string, propertyId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.publicSchemeApi.item(id)}/properties/${propertyId}/courses`);
    }

    loadDirectionCourses(id: string, directionId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.publicSchemeApi.item(id)}/directions/${directionId}/courses`);
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

    findCourses(query: string, type: number): Observable<any> {
        return this.rest.get(`${this.api.list()}/courses?q=${query}&t=${type}`);
    }

    commit(id: string, title: string, to: string, comment: string): Observable<any> {
        return this.rest.patch(this.api.commit(id), {title, to, comment});
    }

    getCheckersUrl(id: string): string {
        return this.api.checkers(id);
    }
}
