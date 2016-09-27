import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, EditService} from 'core/rest';

import {SchemeCourseDto} from '../common/scheme.model';

@Injectable()
export class SchemeDraftService extends EditService {
    private publicSchemeApi: ApiUrl;
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('PUBLIC_SCHEMES_URL') publicSchemeUrl: string,
    ) {
        super(rest, api);
        this.publicSchemeApi = new ApiUrl(publicSchemeUrl);
    }

    loadPropertyCourses(id: string, propertyId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.publicSchemeApi.item(id)}/properties/${propertyId}/courses`);
    }

    loadDirectionCourses(id: string, directionId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.publicSchemeApi.item(id)}/directions/${directionId}/courses`);
    }

    findCourses(query: string, type: number): Observable<any> {
        return this.rest.get(`${this.api.list()}/courses?q=${query}&t=${type}`);
    }
}
