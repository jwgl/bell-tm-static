import {Component, ElementRef, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import {EditMode} from 'core/constants';

import {CourseSelectDto, AbstractGroup} from '../../../common/scheme.model';
import {SchemeDraftService} from '../../draft.service';

@Component({
    selector: 'course-select',
    styles: [require('./course-select.scss')],
    template: require('./course-select.html'),
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

    constructor(private draftService: SchemeDraftService) {}

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
           this.input.nativeElement.focus();
        });

        Observable.combineLatest(
            Observable.merge(
                Observable.fromEvent(this.input.nativeElement, 'compositionstart').map(() => true),
                Observable.fromEvent(this.input.nativeElement, 'compositionend').map(() => false)
            ).startWith(false),
            Observable.fromEvent(this.input.nativeElement, 'keyup')
        )
        .filter(array => !array[0])
        .map(array => array[1])
        .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
        .debounceTime(250)
        .distinctUntilChanged()
        .filter(value => value.length >= 2)
        .switchMap(value => this.search(value))
        .subscribe(value => {
            this.query = value.query;
            this.courses = value.result.filter(c => !this.group.contains(c.id)); // 过滤已选择的课程
        });
    }

    search(query: string): Observable<{query: string, result: CourseSelectDto[]}> {
        let type = this.editMode === EditMode.Create ? 0 : (this.isTempCourse ? 2 : 1);
        return this.draftService.findCourses(query, type).map(result => ({query: query, result: result}));
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
