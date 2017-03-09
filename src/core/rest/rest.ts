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

    post(url: string, data: object): Observable<any> {
        this.deleteEmptyProperties(data);
        return this.http.post(url, data).map(res => {
            if (res.text()) {
                return res.json();
            }
        });
    }

    put(url: string, data: object): Observable<any> {
        this.deleteEmptyProperties(data);
        return this.http.put(url, data).map(res => {
            if (res.text()) {
                return res.json();
            }
        });
    }

    patch(url: string, data: object): Observable<any> {
        this.deleteEmptyProperties(data);
        return this.http.patch(url, data).map(res => {
            if (res.text()) {
                return res.json();
            }
        });
    }

    delete(url: string): Observable<any> {
        return this.http.delete(url).map(res => {
            if (res.text()) {
                return res.json();
            }
        });
    }

    private deleteEmptyProperties(data: any) {
        for (const i in data) {
            if (data[i] === null || data[i] === undefined) {
                delete data[i];
            } else if (typeof data[i] === 'object') {
                this.deleteEmptyProperties(data[i]);
            }
        }
    }
}
