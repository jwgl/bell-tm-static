import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {RollcallFormService} from '../form.service';
import {RollcallForm, RollcallConfig} from '../form.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class RollcallFormEditorComponent implements OnInit {
    rollcallForm: RollcallForm;
    formLoaded = new EventEmitter<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (this.service.config) {
                this.loadForm(params);
            } else {
                this.service.configLoaded.subscribe(_ => {
                    this.loadForm(params);
                });
            }
        });
    }

    loadForm(params: any) {
        this.service.loadDataForCreate(params).subscribe(dto => {
            this.rollcallForm = new RollcallForm(dto, this.service.config);
            this.formLoaded.emit();
        });
    }
}
