import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class VisionDraftService extends EditService {
    private importVisionApi: ApiUrl;

    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('VISION_IMPORT_API_URL') visionImportApiUrl: string,
    ) {
        super(rest, api);
        this.importVisionApi = new ApiUrl(visionImportApiUrl);
    }

    loadDataForImport(id: string): Observable<any> {
        return this.rest.get(this.importVisionApi.item(id));
    }
 }
