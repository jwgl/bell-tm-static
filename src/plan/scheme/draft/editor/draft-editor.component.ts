import {
    Component,
    ViewEncapsulation,
    Inject,
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {SchemeDraftService} from '../draft.service';
import {Scheme, Property, Direction, AbstractGroup, SchemeCourse} from '../../common/scheme.model';
import './draft-editor.model';
import {CourseEditorService} from './course-editor/course-editor.module';

/**
 * 教学计划编辑器
 */
@Component({
    selector: 'scheme-draft-editor',
    styleUrls: ['draft-editor.component.scss'],
    templateUrl: 'draft-editor.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SchemeDraftEditorComponent {
    private editMode: EditMode;
    private vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private courseEditor: CourseEditorService,
        private service: SchemeDraftService,
        @Inject('DEPARTMENT_SCHEMES_API_URL') private departmentSchemesApiUrl: string,
        @Inject('DEPARTMENT_DIRECTIONS_API_URL') private departmentDeirectionsApiUrl: string,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate({program: params['program']}).subscribe(data => this.vm = new Scheme(data));
                break;
            case EditMode.Revise:
                this.service.loadItemForRevise(params['id']).subscribe(data => this.vm = new Scheme(data));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(data => this.vm = new Scheme(data));
                break;
        }
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

    addCourse(group: AbstractGroup): void {
        this.courseEditor.open({
            editMode: EditMode.Create,
            terms: this.vm.terms,
            group: group,
        }).then(dto => {
            group.add(dto);
            group.sort();
        });
    }

    editCourse(schemeCourse: SchemeCourse): void {
        this.courseEditor.open({
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
        this.dialog.list(
            `导入课程 - ${property.name}`,
            this.departmentSchemesApiUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}`
        ).then(id => {
            this.service.loadPropertyCourses(id, property.id).subscribe(courses => {
                courses.forEach(course => {
                    if (!property.contains(course.courseId)) {
                        property.add(course);
                    }
                });
            });
        });
    }

    importDirectionCourses(direction: Direction) {
        this.dialog.list(
            `导入课程 - ${direction.name}`,
            this.departmentDeirectionsApiUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}-${item.directionName}`,
            (item: any) => `${item.schemeId}:${item.directionId}`
        ).then(result => {
            let arr = result.split(':');
            this.service.loadDirectionCourses(arr[0], arr[1]).subscribe(courses => {
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
                this.service.create(this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['/', id]),
                    error => alert(JSON.stringify(error))
                );
                break;
            case EditMode.Revise:
                this.service.revise(this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['/', id]),
                    error => alert(JSON.stringify(error))
                );
                break;
            case EditMode.Edit:
                this.service.update(this.vm.id, this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['/', id]),
                    error => alert(JSON.stringify(error))
                );
                break;
        }
    }
}
