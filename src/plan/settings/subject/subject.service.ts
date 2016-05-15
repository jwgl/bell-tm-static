import {Injectable} from '@angular/core';
import {ApiUrl, Rest, Observable} from '../../../core/http';
@Injectable()
export class SubjectSetupService {
    constructor(
        private rest: Rest,
        private api: ApiUrl
    ) {}

    loadList(): Observable<any[]> {
        return this.rest.get(this.api.list());
    }

    save(subjectId: string, teacherId: string): Observable<void> {
        return this.rest.post(this.api.list(), {subjectId, teacherId});
    }
}
