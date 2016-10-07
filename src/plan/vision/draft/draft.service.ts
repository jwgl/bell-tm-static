import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, EditService} from 'core/rest';

@Injectable()
export class VisionDraftService extends EditService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('VISION_IMPORT_API_URL') private importUrl: string,
    ) {
        super(rest, api);
    }

    loadDataForImport(id: string): Observable<any> {
        return this.rest.get(`${this.importUrl}/${id}`);
    }
 }
