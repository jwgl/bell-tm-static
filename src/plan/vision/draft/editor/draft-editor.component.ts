import {Component} from '@angular/core';
import {FormBuilder, ControlGroup} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';

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
    directives: [PlanTitleComponent],
    pipes: [PLAN_PIPES],
})
export class VisionDraftEditorComponent {
    private editMode: EditMode;
    private vm: Vision;

    private form: ControlGroup;
    private _showSchoolingLength = false;
    private _showAwardedDegree = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dialog: Dialog,
        private draftService: VisionDraftService
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.draftService.loadDataForCreate(params['program']).subscribe(model => this.vm = model);
                break;
            case EditMode.Revise:
                this.draftService.loadItemForRevise(params['id']).subscribe(model => this.vm = model);
                break;
            case EditMode.Edit:
                this.draftService.loadItemForEdit(params['id']).subscribe(model => this.vm = model);
                break;
        }

        this.form = this.formBuilder.group({
            objective: [],
            specification: [],
            schoolingLength: [],
            awardedDegree: [],
        });
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
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Revise:
                this.router.navigate(['/', this.vm.previousId]);
                break;
            case EditMode.Edit:
                this.router.navigate(['/', this.vm.id]);
                break;
        }
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
        this.draftService.create({
            objective:       this.form.value.objective,
            specification:   this.form.value.specification,
            schoolingLength: this.form.value.schoolingLength,
            awardedDegree:   this.form.value.awardedDegree,
            programId:       this.vm.programId,
            versionNumber:   this.vm.versionNumber,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
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
            this.router.navigate(['/', id]);
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
            this.router.navigate(['/', id]);
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
