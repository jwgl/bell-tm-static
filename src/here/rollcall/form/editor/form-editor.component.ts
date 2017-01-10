import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';

import {RollcallFormService} from '../form.service';
import {RollcallForm, RollcallConfig} from '../form.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class RollcallFormEditorComponent implements OnInit {
    rollcallForm: RollcallForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
    ) {}

    ngOnInit() {
        this.route.params
            .mergeMap(params => this.service.scheduleLoaded.mapTo(params))
            .mergeMap(params => this.service.loadDataForCreate(params))
            .subscribe(dto => this.rollcallForm = new RollcallForm(dto, this.service.config));
    }
}
