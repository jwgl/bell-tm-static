import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {Rest} from '../../../core/http';
import {BaseDialog} from '../../../core/dialogs';

@Component({
    selector: 'program-setting-dialog',
    template: require('./program-editor.html'),
})
export class ProgramEditorDialog extends BaseDialog {
    title: string;
    programSetting: any;
    template: {id: number, name: string};
    constructor(private rest: Rest) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.programSetting = {
            visionRevisible: this.options.programSetting.visionRevisible,
            practiceCreditRatio: this.options.programSetting.practiceCreditRatio,
            templateLocked: this.options.programSetting.templateLocked,
            schemeRevisible: this.options.programSetting.schemeRevisible,
            templateId: this.options.programSetting.templateId,
            templateName: this.options.programSetting.templateName,
        };
        this.title = `设置 - ${this.options.programSetting.grade}级${this.options.programSetting.subjectName}`;
        return this.rest.get(this.options.url).do(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === this.programSetting.templateId) {
                    this.template = data[i];
                    break;
                }
            }
        });
    }

    onConfirmed() {
        return {
            visionRevisible: this.programSetting.visionRevisible,
            practiceCreditRatio: this.programSetting.practiceCreditRatio,
            templateLocked: this.programSetting.templateLocked,
            schemeRevisible: this.programSetting.schemeRevisible,
            templateId: this.template.id,
            templateName: this.template.name,
        };
    }
}
