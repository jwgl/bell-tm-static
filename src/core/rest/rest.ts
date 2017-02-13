import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export {Observable};

@Injectable()
export class Rest {
    constructor(private http: Http) {}

    get(url: string): Observable<any> {
        return this.http.get(url).map(res => res.json());
    }

    post(url: string, data: Object): Observable<any> {
        return this.http.post(url, JSON.stringify(data)).map(res => res.json());
    }

    put(url: string, data: Object): Observable<any> {
        return this.http.put(url, JSON.stringify(data)).map(res => res.json());
    }

    patch(url: string, data: Object): Observable<any> {
        return this.http.patch(url, JSON.stringify(data)).map(res => res.json());
    }

    delete(url: string): Observable<any> {
        return this.http.delete(url).map(res => res.json());
    }
}
