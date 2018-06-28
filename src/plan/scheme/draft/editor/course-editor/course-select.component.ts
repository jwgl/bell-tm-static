import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import {EditMode} from 'core/constants';

import {AbstractGroup, CourseSelectDto, SchemeCourse} from '../../../shared/scheme.model';
import {SchemeDraftService} from '../../draft.service';

@Component({
    selector: 'course-select',
    styleUrls: ['course-select.component.scss'],
    templateUrl: 'course-select.component.html',
})
export class CourseSelectComponent {
    @ViewChild('search') input: ElementRef;
    @ViewChild('dropdown') dropdown: ElementRef;

    @Input() editMode: EditMode;
    @Input() courseId: string;
    @Input() isTempCourse: boolean;
    @Input() group: AbstractGroup;
    @Output() selectCourse: EventEmitter<any> = new EventEmitter<any>();

    courses: any;
    query: any;

    constructor(private service: SchemeDraftService) {}

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
           this.input.nativeElement.focus();
        });

        Observable.combineLatest(
            Observable.merge(
                Observable.fromEvent(this.input.nativeElement, 'compositionstart').map(() => true),
                Observable.fromEvent(this.input.nativeElement, 'compositionend').map(() => false),
            ).startWith(false),
            Observable.fromEvent(this.input.nativeElement, 'keyup'),
        )
        .filter(array => !array[0])
        .map(array => array[1])
        .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
        .debounceTime(250)
        .distinctUntilChanged()
        .filter(value => value.length >= 2)
        .switchMap(value => this.search(value))
        .subscribe(value => {
            this.query = value.query;
            // 过滤已选择的课程
            this.courses = _.differenceWith(value.result, this.group.courses, (a: CourseSelectDto, b: SchemeCourse) => {
                return a.id === b._courseId;
            });
        });
    }

    search(query: string): Observable<{query: string, result: CourseSelectDto[]}> {
        const type = this.editMode === EditMode.Create ? 0 : (this.isTempCourse ? 2 : 1);
        return this.service.findCourses(query, type, this.group.property.id).map(result => ({query, result}));
    }

    clearCourse() {
        this.selectCourse.emit(null);
    }

    highlight(str: string, key: string): string {
        return str.replace(this.query, `<mark>${this.query}</mark>`);
    }

    get result(): string {
        if (!this.courseId) {
            return null;
        } else {
            return this.isTempCourse ? `临时课程（${this.courseId}）` : `${this.courseId}`;
        }
    }

    get clearable(): boolean {
        return this.editMode === EditMode.Create;
    }
}
