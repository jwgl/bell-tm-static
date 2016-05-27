import {
    Component,
    ElementRef,
    ViewEncapsulation,
} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';

import {Dialog, SimpleListSelectDialog} from '../../../../core/dialogs';
import {EditMode} from '../../../../core/constants';
import {PlanTitleComponent} from '../../../common/components';
import {SchemeDraftService} from '../draft.service';
import {Scheme, Property, Direction, AbstractGroup, SchemeCourse} from '../../common/scheme.model';
import './draft-editor.model';
import {SchemeDraftTableComponent} from './scheme-table.component';
import {CourseEditorDialog} from './course-editor.dialog';

/**
 * 教学计划编辑器
 */
@Component({
    selector: 'scheme-draft-editor',
    providers: [Dialog],
    styles: [require('./draft-editor.scss')],
    template: require('./draft-editor.html'),
    directives: [
        SchemeDraftTableComponent,
        PlanTitleComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SchemeDraftEditorComponent {
    private editMode: EditMode;
    private vm: Scheme;

    constructor(
        private router: Router,
        private segment: RouteSegment,
        private elementRef: ElementRef,
        private dialog: Dialog,
        private draftService: SchemeDraftService
    ) {
        if (this.segment.urlSegments[0].toString() === 'create') {
            this.editMode = EditMode.Create;
        } else if (this.segment.urlSegments[1].toString() === 'edit') {
            this.editMode = EditMode.Edit;
        } else if (this.segment.urlSegments[1].toString() === 'revise') {
            this.editMode = EditMode.Revise;
        } else {
            throw new Error('Unsupported url');
        }

        switch (this.editMode) {
            case EditMode.Create:
                this.draftService.loadDataForCreate(segment.getParam('program')).subscribe(data => this.onLoadData(data));
                break;
            case EditMode.Revise:
                this.draftService.loadItemForRevise(segment.getParam('id')).subscribe(data => this.onLoadData(data));
                break;
            case EditMode.Edit:
                this.draftService.loadItemForEdit(segment.getParam('id')).subscribe(data => this.onLoadData(data));
                break;
        }
    }

    onLoadData(data: any) {
        this.vm = new Scheme(data);
        this.vm.onInit(this.editMode);
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
            case EditMode.Edit:
                this.router.navigate([this.segment.getParam('id')]);
                break;
        }
    }

    addCourse(group: AbstractGroup): void {
        this.dialog.open(CourseEditorDialog, {
            editMode: EditMode.Create,
            terms: this.vm.terms,
            group: group,
        }).then(dto => {
            group.add(dto);
            group.sort();
        });
    }

    editCourse(schemeCourse: SchemeCourse): void {
        this.dialog.open(CourseEditorDialog, {
            editMode: EditMode.Edit,
            terms: this.vm.terms,
            group: schemeCourse.group,
            dto: schemeCourse.toClientDto(),
        }).then(dto => {
            schemeCourse.update(dto);
            schemeCourse.group.sort();
        });
    }

    deleteCourse(schemeCourse: SchemeCourse): void {
        schemeCourse.remove();
    }

    restoreCourse(schemeCourse: SchemeCourse): void {
        schemeCourse.restore();
    }

    importCourses(group: AbstractGroup): void {
        if (group instanceof Property) {
            this.importPropertyCourses(group);
        } else if (group instanceof Direction) {
            this.importDirectionCourses(group);
        }
    }

    importPropertyCourses(property: Property) {
        this.dialog.open(SimpleListSelectDialog, {
            title: '选择导入的专业',
            url: `/api/departments/${this.vm.departmentId}/schemes`,
            labelFn: (item: any) => `${item.grade}级${item.subjectName}`,
        }).then(id => {
            this.draftService.loadPropertyCourses(id, property.id).subscribe(courses => {
                courses.forEach(course => {
                    if (!property.contains(course.courseId)) {
                        property.add(course);
                    }
                });
            });
        });
    }

    importDirectionCourses(direction: Direction) {
        this.dialog.open(SimpleListSelectDialog, {
            title: '选择导入的专业及方向',
            url: `/api/departments/${this.vm.departmentId}/schemeDirections`,
            valueFn: (item: any) => `${item.schemeId}:${item.directionId}`,
            labelFn: (item: any) => `${item.grade}级${item.subjectName}-${item.directionName}`,
        }).then(result => {
            let arr = result.split(':');
            this.draftService.loadDirectionCourses(arr[0], arr[1]).subscribe(courses => {
                courses.forEach(course => {
                    if (!direction.contains(course.courseId)) {
                        direction.add(course);
                    }
                });
            });
        });
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
        this.draftService.create(this.vm.toServerDto()).subscribe(id => this.router.navigate([id]), error => alert(error));
    }

    revise() {
        this.draftService.revise(this.vm.toServerDto()).subscribe(id => this.router.navigate([id]), error => alert(error));
    }

    update() {
        this.draftService.update(this.vm.toServerDto()).subscribe(id => this.router.navigate([id]), error => alert(error));
    }
}
