import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ApiUrl, Rest, EditService} from 'core/rest';
import {RollcallConfig} from './form.model';

@Injectable()
export class RollcallFormService extends EditService {
    termLoaded = new Subject<any>();
    schedulesLoaded = new Subject<any[]>();
    configLoaded = new Subject<RollcallConfig>();

    private _term: any;
    private _schedules: any[];
    private _config: RollcallConfig;

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    loadFormList() {
        this.loadList().subscribe(result => {
            this.term = result.term;
            this.schedules = result.schedules;
            this.config = result.config;
        });
    }

    get config(): RollcallConfig {
        return this._config;
    }

    set config(config: RollcallConfig) {
        this._config = config;
        this.configLoaded.next(this.config);
    }

    get term() {
        return this._term;
    }

    set term(term: any) {
        this._term = term;
        this.termLoaded.next(this._term);
    }

    get schedules() {
        return this._schedules;
    }

    set schedules(schedules: any[]) {
        this._schedules = schedules;
        this.schedulesLoaded.next(this._schedules);
    }
}
