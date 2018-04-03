import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

@Component({
    selector: 'agreement-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class AgreementFormViewerComponent {
    @Input() vm: any;
    @Input() items: any[];

    optionsLength(options: any[]): number {
        return _.chain(options).map((option: any) => option.grades.length).sum().value();
    }

    subjectLength(subjects: any[]): number {
        return _.chain(subjects).sumBy(subject => this.optionsLength(subject.options)).value();
    }
}
