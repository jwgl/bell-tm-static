import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {ApiUrl, Rest, EditService} from 'core/rest';
import {RollcallConfig} from './form.model';

@Injectable()
export class RollcallFormService extends EditService {
    term: any;
    schedules: any[];
    config: RollcallConfig;

    private _scheduleLoaded = new BehaviorSubject<boolean>(false);

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadFormList() {
        this.loadList().subscribe(result => {
            this.term = result.term;
            this.schedules = result.schedules;
            this.config = result.config;
            this._scheduleLoaded.next(true);
        });
    }

    get scheduleLoaded(): Observable<boolean> {
        return this._scheduleLoaded.filter(b => b);
    }
}
