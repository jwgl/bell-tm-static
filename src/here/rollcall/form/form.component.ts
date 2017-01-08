import {Component, OnInit} from '@angular/core';

import {RollcallFormService} from './form.service';

@Component({
    selector: 'rollcall-form-container',
    template: '<router-outlet></router-outlet>',
})
export class RollcallFormComponent implements OnInit {
    constructor(private service: RollcallFormService) {}

    ngOnInit() {
        this.service.loadFormList();
    }
}
