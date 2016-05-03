import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export {Observable};

@Injectable()
export class Rest {
    constructor(private http: Http) {}

    get(url: string): Observable<any> {
        let headers = new Headers({Accept: 'application/json'});
        return this.http.get(url, {headers: headers})
        .map(res => res.json());
    }

    post(url: string, data: Object): Observable<any> {
        return this.http.post(url, JSON.stringify(data), {headers: this.getPostHeader()})
        .map(res => res.json());
    }

    put(url: string, data: Object): Observable<any> {
        return this.http.put(url, JSON.stringify(data), {headers: this.getPostHeader()})
        .map(res => res.json());
    }

    patch(url: string, data: Object): Observable<any> {
        return this.http.patch(url, JSON.stringify(data), {headers: this.getPostHeader()})
        .map(res => res.json());
    }

    delete(url: string): Observable<any> {
        return this.http.delete(url, {headers: this.getPostHeader()})
        .map(res => res.json());
    }

    private getPostHeader() {
        return new Headers({
            Accept: 'application/json',
            'X-XSRF-TOKEN': this.getCsrfCookie(),
        });
    }

    private getCsrfCookie(): string {
        let value = '; ' + document.cookie;
        let parts = value.split('; XSRF-TOKEN=');
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        } else {
            return undefined;
        }
    }
}
