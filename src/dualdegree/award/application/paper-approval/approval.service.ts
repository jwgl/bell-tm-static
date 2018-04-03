import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class PaperApprovalService extends EditService {
    xsrfToken: string;

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    finish(id: any): Observable<any> {
        return this.rest.patch(`${this.api.item(id)}?op=FINISH`, {});
    }

    getUploadUrl(id: any): string {
        return `/zuul${this.api.item(id)}/upload`;
    }

    loadFileNames(id: any, wi: any): Observable<any> {
        return this.rest.get(`${this.api.item(id)}/workitems/${wi}`);
    }
}
