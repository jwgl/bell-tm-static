import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class BookingFormService extends EditService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('DEPARTMENT_BOOKING_TYPES_API_URL')
        private departmentBookingTypesApiUrl: string,
    ) {
        super(rest, api);
    }

    getDepartmentBookingType(departmentId: string): Observable<any> {
        const url = this.departmentBookingTypesApiUrl.replace('${departmentId}', departmentId);
        return this.rest.get(url);
    }

    findPlace(options: any) {
        return this.rest.get(`${this.api.list()}/places?${this.api.buildQueryString(options)}`);
    }

    getNotice() {
        return this.rest.get(`${this.api.list()}/notice`);
    }
}
