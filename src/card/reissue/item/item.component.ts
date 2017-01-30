import {Component, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Workflow} from 'core/workflow';

import {ReissueItemService} from './item.service';

@Component({
    selector: 'reissue-item',
    templateUrl: 'item.component.html',
})
export class ReissueItemComponent {
    id: string;
    vm: any;
    constructor(elementRef: ElementRef,
        private workflow: Workflow,
        private service: ReissueItemService,
    ) {
        let id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(id).subscribe(dto => {
            this.vm = dto;
        });
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
