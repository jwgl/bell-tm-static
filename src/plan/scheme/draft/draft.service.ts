import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, EditService} from 'core/rest';

import {SchemeCourseDto} from '../common/scheme.model';

@Injectable()
export class SchemeDraftService extends EditService {
    private importSchemeApi: ApiUrl;
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('SCHEME_IMPORT_API_URL') schemeImportApiUrl: string,
    ) {
        super(rest, api);
        this.importSchemeApi = new ApiUrl(schemeImportApiUrl);
    }

    loadPropertyCourses(id: string, propertyId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.importSchemeApi.item(id)}/properties/${propertyId}/courses`);
    }

    loadDirectionCourses(id: string, directionId: number): Observable<SchemeCourseDto[]> {
        return this.rest.get(`${this.importSchemeApi.item(id)}/directions/${directionId}/courses`);
    }

    findCourses(query: string, type: number): Observable<any> {
        return this.rest.get(`${this.api.list()}/courses?q=${query}&t=${type}`);
    }
}
