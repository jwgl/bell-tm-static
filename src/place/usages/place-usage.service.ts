import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

import {Place, PlaceUsage} from './place-usage.model';

@Injectable()
export class PlaceUsageService extends ShowService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadPlaces(building: string): Observable<Place[]> {
        return this.rest.get(`${this.api.item(building)}/places`);
    }

    loadUsage(building: string, placeId: string): Observable<PlaceUsage[]> {
        return this.rest.get(`${this.api.item(building)}/places/${placeId}/usages`);
    }
}
