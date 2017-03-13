import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Workflow} from 'core/workflow';

import {ReissueItemService} from './item.service';

@Component({
    selector: 'reissue-item',
    templateUrl: 'item.component.html',
})
export class ReissueItemComponent {
    form: any;
    student: any;

    constructor(
        elementRef: ElementRef,
        private workflow: Workflow,
        private service: ReissueItemService,
    ) {
        const id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(id).subscribe(dto => {
            this.form = dto.form;
            this.student = dto.student;
        });
    }
}
