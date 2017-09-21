import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';

import { ObservationFormService } from '../form.service';
import { EvaluationItem, EvaluationMap, ObservationForm } from '../shared/form.model';

@Component({
    selector: 'observation-item',
    templateUrl: 'item.component.html',
})
export class ObservationItemComponent {
    vm: ObservationForm;
    evaluationSystem: EvaluationMap[];
    isAdmin: boolean;
    activeTermId: number;

    constructor(
        private router: Router,
        private dialog: CommonDialog,
        private route: ActivatedRoute,
        private service: ObservationFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new ObservationForm(dto.form);
            this.evaluationSystem = dto.evaluationSystem;
            this.isAdmin = dto.isAdmin;
            this.activeTermId = dto.activeTermId;
        });
    }

    validate(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    get evaluateList(): any[] {
        return _.chain(this.evaluationSystem).map(data => data.value).flatten().map((item: EvaluationItem) => item.value).value();
    }

    remove(): void {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    cancel(): void {
        this.dialog.confirm('撤销', '确定要撤销提交吗？').then(() => {
            this.service.cancel(this.vm.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    submit(): void {
        const validate: string[] = [];
        if (_.some(this.evaluateList, this.validate)) {
            validate.push('请对全部评分项目都给出评分后再提交');
        }
        if (validate.length) {
            this.dialog.error(validate);
        } else {
            this.service.submit(this.vm.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        }
    }
}
