import {Injectable, Inject, OpaqueToken} from '@angular/core';

export const API_URL = new OpaqueToken('API_URL');
export const BASE_URL = new OpaqueToken('BASE_URL');

@Injectable()
export class ApiUrl {
    constructor(@Inject(API_URL) private baseUrl: string) {
        let match = window.location.href.match(/\/users\/([^\/]+)\//);
        if (match) {
            this.baseUrl = this.baseUrl.replace('${userId}', match[1]);
        }
    }

    list(options: {[key: string]: any} = {}) {
        if (Object.keys(options).length !== 0) {
            return `${this.baseUrl}?${this.buildQueryString(options)}`;
        } else {
            return this.baseUrl;
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

    commit(id: any): string {
        return `${this.item(id)}?op=COMMIT`;
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

