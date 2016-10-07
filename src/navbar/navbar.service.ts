import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class NavbarService extends ShowService {
    constructor(rest: Rest, api: ApiUrl, private http: Http) {
        super(rest, api);
    }

    loadList(groups: string[]): Observable<any> {
        let queryString = groups.map(group => `group=${group}`).join('&');
        return this.rest.get(`${this.api.list()}?${queryString}`);
    }

    logout(): Observable<void> {
        return  this.http.post('/uaa/logout', null, {withCredentials: true}).map(response => null);
    }
}
