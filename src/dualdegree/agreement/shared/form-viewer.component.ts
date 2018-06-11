import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';

import { AgreementViewService } from './filter.service';

@Component({
    selector: 'agreement-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class AgreementFormViewerComponent {
    @Input() vm: any;
    @Input() items: any[];

    constructor(
        private service: AgreementViewService,
        private dialogs: CommonDialog,
    ) { }

    optionsLength(options: any[]): number {
        return _.chain(options).map((option: any) => option.grades.length).sum().value();
    }

    subjectLength(subjects: any[]): number {
        return _.chain(subjects).sumBy(subject => this.optionsLength(subject.options)).value();
    }

    comment(option: any) {
        this.service.getCn(option.agreementId, option.id).subscribe(dto => this.dialogs.confirm('中文名称', dto.majorOptionsCn));
    }
}
