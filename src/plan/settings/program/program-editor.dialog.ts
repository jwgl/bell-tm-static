import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';
import {Rest} from 'core/rest';

import 'rxjs/add/operator/do';

@Component({
    selector: 'program-setting-dialog',
    templateUrl: 'program-editor.dialog.html',
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
            schemeExportable: this.options.programSetting.schemeExportable,
            templateId: this.options.programSetting.templateId,
            templateName: this.options.programSetting.templateName,
        };
        this.title = `设置 - ${this.options.programSetting.grade}级${this.options.programSetting.subjectName}`;
        return this.rest.get(this.options.url).do((data: any[]) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === this.programSetting.templateId) {
                    this.template = data[i];
                    break;
                }
            }
        });
    }

    protected onConfirmed() {
        return {
            visionRevisible: this.programSetting.visionRevisible,
            practiceCreditRatio: this.programSetting.practiceCreditRatio,
            templateLocked: this.programSetting.templateLocked,
            schemeRevisible: this.programSetting.schemeRevisible,
            schemeExportable: this.programSetting.schemeExportable,
            templateId: this.template.id,
            templateName: this.template.name,
        };
    }
}
