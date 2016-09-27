import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class NavbarService extends ShowService {
    constructor(rest: Rest, api: ApiUrl, private http: Http) {
        super(rest, api);
    }

    logout(): Observable<void> {
        return  this.http.post('/uaa/logout', null, {withCredentials: true}).map(response => null);
    }
}
