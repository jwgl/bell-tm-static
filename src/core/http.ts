import {HTTP_PROVIDERS} from 'angular2/http';
import {Rest} from './http/rest';
import {ApiUrl} from './http/api-url';

export const REST_PROVIDERS: any[] = [
    ...HTTP_PROVIDERS,
    Rest,
    ApiUrl,
];

export * from './http/rest';
export * from './http/api-url';
