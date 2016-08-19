import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from '../../../core/http';

@Injectable()
export class VisionReviewService {
    id: string;
    wi: string;
    constructor(private rest: Rest, private api: ApiUrl) {}

    loadItem(): Observable<any> {
        return this.rest.get(this.api.review(this.id, this.wi));
    }

    accept(title: string, to: string, comment: string): Observable<any> {
        return this.rest.patch(this.api.accept(this.id, this.wi), {title, to, comment});
    }

    reject(title: string, comment: string): Observable<any> {
        return this.rest.patch(this.api.reject(this.id, this.wi), {title, comment});
    }

    getApproversUrl(): string {
        return this.api.approvers(this.id, this.wi);
    }
}
