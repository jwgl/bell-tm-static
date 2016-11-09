import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

@Injectable()
export class SubjectDirectorService {
    constructor(
        private rest: Rest,
        private api: ApiUrl
    ) {}

    loadList(): Observable<any[]> {
        return this.rest.get(this.api.list());
    }

    updateDirector(subjectId: string, directorId: string): Observable<void> {
        return this.rest.put(this.api.item(subjectId), {directorId});
    }

    updateSecretary(subjectId: string, secretaryId: string): Observable<void> {
        return this.rest.put(this.api.item(subjectId), {secretaryId});
    }
}
