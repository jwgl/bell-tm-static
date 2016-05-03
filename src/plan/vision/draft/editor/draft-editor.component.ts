import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup} from '@angular/common';
import {Router, RouteSegment} from '@angular/router';

import {Select2} from '../../../../core/directives';
import {Dialog, SimpleListSelectDialog} from '../../../../core/dialogs';
import {EditMode} from '../../../../core/constants';
import {PlanTitleComponent} from '../../../common/components';
import {PLAN_PIPES} from '../../../common/pipes';
import {Vision} from '../../common/vision.model';
import {VisionDraftService} from '../draft.service';

@Component({
    selector: 'vision-draft-editor',
    providers: [FormBuilder, Dialog],
    styles: [require('./draft-editor.scss')],
    template: require('./draft-editor.html'),
    directives: [Select2, PlanTitleComponent],
    pipes: [PLAN_PIPES],
})
export class VisionDraftEditorComponent implements OnInit {
    private id: string;
    private editMode: EditMode;
    private vm: Vision;

    private form: ControlGroup;
    private _showSchoolingLength = false;
    private _showAwardedDegree = false;
    constructor(
        private draftService: VisionDraftService,
        private router: Router,
        private segment: RouteSegment,
        private formBuilder: FormBuilder,
        private dialog: Dialog
    ) {
        this.id = segment.getParam('id');

        if (this.segment.urlSegments[0].toString() === 'create') {
            this.editMode = EditMode.Create;
        } else if (this.segment.urlSegments[1].toString() === 'edit') {
            this.editMode = EditMode.Edit;
        } else if (this.segment.urlSegments[1].toString() === 'revise') {
            this.editMode = EditMode.Revise;
        } else {
            throw new Error('Unsupported url');
        }

        this.form = this.formBuilder.group({
            objective: [],
            specification: [],
            schoolingLength: [],
            awardedDegree: [],
        });
    }

    ngOnInit() {
        switch (this.editMode) {
            case EditMode.Revise:
                this.draftService.loadItemForRevise(this.id).subscribe(model => this.vm = model);
                break;
            case EditMode.Edit:
                this.draftService.loadItemForEdit(this.id).subscribe(model => this.vm = model);
                break;
            default:
                this.draftService.loadDataForCreate(this.segment.getParam('program')).subscribe(model => this.vm = model);
                break;
        }
    }

    get showSchoolingLength(): boolean {
        return this._showSchoolingLength || this.vm && !!this.vm.schoolingLength;
    }

    get showAwardedDegree(): boolean {
        return this._showAwardedDegree || this.vm && !!this.vm.awardedDegree;
    }

    get canEditVersion(): boolean {
        return this.editMode === EditMode.Create || this.editMode === EditMode.Revise;
    }

    versionChanged(newValue: number) {
        this.vm.versionNumber = newValue;
    }

    cancel() {
        this.router.navigate([this.id]);
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Revise:
                this.revise();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        throw new Error('no implement');
    }

    revise() {
        this.draftService.revise({
            previousId:      this.vm.previousId,
            objective:       this.form.value.objective,
            specification:   this.form.value.specification,
            schoolingLength: this.form.value.schoolingLength,
            awardedDegree:   this.form.value.awardedDegree,
            programId:       this.vm.programId,
            versionNumber:   this.vm.versionNumber,
        }).subscribe(id => {
            this.router.navigate([id]);
        }, error => {
            alert(error);
        });
    }

    update() {
        this.draftService.update({
            id:              this.vm.id,
            objective:       this.form.value.objective,
            specification:   this.form.value.specification,
            schoolingLength: this.form.value.schoolingLength,
            awardedDegree:   this.form.value.awardedDegree,
            programId:       this.vm.programId,
        }).subscribe(id => {
            this.router.navigate([id]);
        }, error => {
            alert(error);
        });
    }

    import() {
        this.dialog.open(SimpleListSelectDialog, {
            title: '选择导入的专业',
            url: `/api/departments/${this.vm.departmentId}/visions`,
            labelFn: (item: any) => `${item.grade}级${item.subjectName}`,
        }).then(id => {
            this.draftService.loadDataForImport(id).subscribe(vision => {
               this.vm.objective = vision.objective;
               this.vm.specification = vision.specification;
               this.vm.schoolingLength = vision.schoolingLength;
               this.vm.awardedDegree = vision.awardedDegree;
            });
        });
    }
}
