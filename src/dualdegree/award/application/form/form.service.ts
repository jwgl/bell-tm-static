import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class ApplicationFormService extends EditService {
    list: any[];
    xsrfToken: string;

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadDataForCreate(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(`${this.api.list()}/create?awardId=${options.awardId}`);
    }

    loadApplicationForm(id: any, options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(`${this.api.list()}/${options.awardId}/applications/${id}`);
    }

    getUploadUrl(options: {[key: string]: any} = {}): string {
        return `/zuul${this.api.list()}/upload?awardId=${options.awardId}`;
    }
}
