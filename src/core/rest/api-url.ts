import {Inject, Injectable, InjectionToken} from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class ApiUrl {
    constructor(@Inject(API_URL) private apiUrl: string) {
        if (apiUrl.indexOf('${userId}') !== -1) {
            const match = window.location.href
                    .match(/\/(users|teachers|students|reviewers|checkers|approvers|observers|mentors)\/([^\/]+)\//);
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

    revoke(id: any) {
        return `${this.item(id)}/workitems/undefined?op=REVOKE`;
    }

    checkers(id: any): string {
        return `${this.item(id)}/checkers`;
    }

    approvers(id: any): string {
        return `${this.item(id)}/approvers`;
    }

    tousers(id: any): string {
        return `${this.item(id)}/tousers`;
    }

    workitem(id: any, wi: any) {
        return `${this.item(id)}/workitems/${wi}`;
    }

    accept(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=ACCEPT`;
    }

    reject(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=REJECT`;
    }

    next(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=NEXT`;
    }

    buildQueryString(options: {[key: string]: string}): string {
        const search: string[] = [];
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                search.push(`${key}=${encodeURIComponent(options[key])}`);
            }
        }

        return search.join('&');
    }
}
