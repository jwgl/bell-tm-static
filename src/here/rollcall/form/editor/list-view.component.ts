import {Component, Host, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';
import {RollcallType, RollcallTypes, RollcallKeys, Student} from '../form.model';

const PageSize = 5;

@Component({
    styleUrls: ['list-view.component.scss'],
    templateUrl: 'list-view.component.html',
})
export class RollcallListViewComponent extends BaseRollcallView {
    @ViewChild('list') list: ElementRef;

    readonly operations: {[key: string]: {fn: () => void, param?: any}} = {
        'PageUp'    : {fn: this.prev, param: PageSize},
        'PageDown'  : {fn: this.next, param: PageSize},
        'ArrowUp'   : {fn: this.prev},
        'ArrowLeft' : {fn: this.prev},
        'Up'        : {fn: this.prev},
        'Left'      : {fn: this.prev},
        'ArrowDown' : {fn: this.next},
        'ArrowRight': {fn: this.next},
        'Down'      : {fn: this.next},
        'Right'     : {fn: this.next},
        'Home'      : {fn: this.first},
        'End'       : {fn: this.last},
        'Enter'     : {fn: this.toggleLocal},
        '1'         : {fn: this.toggleLocal, param: 'absent'},
        '2'         : {fn: this.toggleLocal, param: 'late'},
        '3'         : {fn: this.toggleLocal, param: 'early'},
        '4'         : {fn: this.toggleLocal, param: 'attend'},
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
        @Host() editor: RollcallFormEditorComponent,
    ) {
        super(editor);
    }

    onClick(student: Student) {
        this.rollcallForm.activateStudent(student);
        this.scrollItem(true);
    }

    onKeydown(event: KeyboardEvent) {
        let operation = this.operations[event.key];
        if (operation) {
            if (operation.param) {
                operation.fn.apply(this, [operation.param]);
            } else {
                operation.fn.apply(this);
            }
            this.scrollItem();
        }
    }

    prev(step?: number) {
        this.rollcallForm.activatePrev(step);
    }

    next(step?: number) {
        this.rollcallForm.activateNext(step);
    }

    first() {
        this.rollcallForm.activateFirst();
    }

    last() {
        this.rollcallForm.activateLast();
    }

    toggleLocal(type?: string) {
        let student = this.rollcallForm.activeStudent;
        if (student.pending || student.isFreeListen || student.isCancelExam) {
            // doing nothing
        } else if (student.leaveRequest) {
            if (!type) {
                window.open(`../../leaves/${student.leaveRequest.id}`, '_blank');
            }
        } else if (type) {
            super.toggle(student, type);
        } else {
            if (student.rollcallItem) {
                type = RollcallKeys.find(key =>
                        student.rollcallItem.type === RollcallTypes[key].value ||
                        student.rollcallItem.type === RollcallType.LateEarly &&
                        RollcallTypes[key].value === RollcallType.Early);
                if (type) {
                    super.toggle(student, type);
                }
            } else {
                super.toggle(student, 'absent');
            }
        }
    }

    scrollItem(click = false) {
        let ul = this.list.nativeElement as HTMLElement;
        let itemCount = this.rollcallForm.visibleStudents.length;
        if (itemCount > PageSize) {
            let itemIndex = this.rollcallForm.activeIndex;
            let li = ul.children[itemIndex] as HTMLElement;

            let listHeight = ul.offsetHeight;
            let itemHeight = li.offsetHeight;
            let favorPosition = Math.floor(PageSize / 2);
            let favorHeight = favorPosition * itemHeight;

            if (!click && itemIndex > favorPosition && li.offsetTop - ul.scrollTop < favorHeight) {
                ul.scrollTop = li.offsetTop - favorHeight;
            } else if (li.offsetTop - ul.scrollTop < 0) {
                ul.scrollTop = li.offsetTop;
            } else if (!click && itemIndex + favorPosition < itemCount && li.offsetTop - ul.scrollTop > favorHeight) {
                ul.scrollTop = li.offsetTop - favorHeight;
            } else if (li.offsetTop - ul.scrollTop + itemHeight >= listHeight) {
                ul.scrollTop = li.offsetTop - listHeight + itemHeight;
            }
        }
    }
}
