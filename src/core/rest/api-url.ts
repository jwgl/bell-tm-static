import {Injectable, Inject, OpaqueToken} from '@angular/core';

export const API_URL = new OpaqueToken('API_URL');
export const BASE_URL = new OpaqueToken('BASE_URL');

@Injectable()
export class ApiUrl {
    constructor(@Inject(API_URL) private apiUrl: string) {
        if (apiUrl.indexOf('${userId}') !== -1) {
            const match = window.location.href.match(/\/(users|teachers|students)\/([^\/]+)\//);
            if (match) {
                this.apiUrl = this.apiUrl.replace('${userId}', match[2]);
            }
        }

        if (apiUrl.indexOf('${departmentId}') !== -1) {
            const match = window.location.href.match(/\/departments\/([^\/]+)\//);
            if (match) {
                this.apiUrl = this.apiUrl.replace('${departmentId}', match[1]);
            }
        }
    }

    list(options: {[key: string]: any} = {}) {
        if (Object.keys(options).length !== 0) {
            return `${this.apiUrl}?${this.buildQueryString(options)}`;
        } else {
            return this.apiUrl;
        }
    }

    item(id: any): string {
        return `${this.list()}/${id}`;
    }

    itemForRevise(id: any): string {
        return `${this.list()}/create?type=revise&base=${id}`;

    }

    itemForEdit(id: any): string {
        return `${this.item(id)}/edit`;
    }

    dataForCreate(options: {[key: string]: any} = {}): string {
        if (Object.keys(options).length !== 0) {
            return `${this.list()}/create?${this.buildQueryString(options)}`;
        } else {
            return `${this.list()}/create`;
        }
    }

    revise(): string {
        return `${this.list()}?type=revise`;
    }

    submit(id: any): string {
        return `${this.item(id)}?op=SUBMIT`;
    }

    checkers(id: any): string {
        return `${this.item(id)}/checkers`;
    }

    review(id: any, wi: any) {
        return `${this.item(id)}/reviews/${wi}`;
    }

    accept(id: any, wi: any) {
        return `${this.review(id, wi)}?op=ACCEPT`;
    }

    reject(id: any, wi: any) {
        return `${this.review(id, wi)}?op=REJECT`;
    }

    approvers(id: any, wi: any) {
        return `${this.review(id, wi)}/approvers`;
    }

    buildQueryString(options: {[key: string]: string}): string {
        let search: string[] = [];
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                search.push(`${key}=${options[key]}`);
            }
        }

        return search.join('&');
    }
}

