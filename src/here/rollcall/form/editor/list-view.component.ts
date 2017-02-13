import {Component, ElementRef, Host, Inject, ViewChild} from '@angular/core';

import {Student} from '../form.model';
import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';

const PageSize = 5;

@Component({
    styleUrls: ['list-view.component.scss'],
    templateUrl: 'list-view.component.html',
})
export class RollcallListViewComponent extends BaseRollcallView {
    @ViewChild('list') list: ElementRef;

    readonly operations: {[key: string]: {fn: () => void, param?: any}} = {
        PageUp    : {fn: this.prev, param: PageSize},
        PageDown  : {fn: this.next, param: PageSize},
        ArrowUp   : {fn: this.prev},
        ArrowLeft : {fn: this.prev},
        Up        : {fn: this.prev},
        Left      : {fn: this.prev},
        ArrowDown : {fn: this.next},
        ArrowRight: {fn: this.next},
        Down      : {fn: this.next},
        Right     : {fn: this.next},
        Home      : {fn: this.first},
        End       : {fn: this.last},
        Enter     : {fn: this.toggleLocal},
        1         : {fn: this.toggleLocal, param: 'absent'},
        2         : {fn: this.toggleLocal, param: 'late'},
        3         : {fn: this.toggleLocal, param: 'early'},
        4         : {fn: this.toggleLocal, param: 'attend'},
    };

    constructor(@Host() editor: RollcallFormEditorComponent) {
        super(editor);
    }

    onClick(student: Student) {
        this.rollcallForm.activateStudent(student);
        this.scrollItem(true);
    }

    onKeydown(event: KeyboardEvent) {
        const operation = this.operations[event.key];
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
        const student = this.rollcallForm.activeStudent;
        if (student.absence) {
            window.open(`/web/here/${student.absence.url}/${student.absence.id}`, '_blank');
        } else {
            super.toggle(student, type);
        }
    }

    scrollItem(click = false) {
        const ul = this.list.nativeElement as HTMLElement;
        const itemCount = this.rollcallForm.visibleStudents.length;
        if (itemCount > PageSize) {
            const itemIndex = this.rollcallForm.activeIndex;
            const li = ul.children[itemIndex] as HTMLElement;

            const listHeight = ul.offsetHeight;
            const itemHeight = li.offsetHeight;
            const favorPosition = Math.floor(PageSize / 2);
            const favorHeight = favorPosition * itemHeight;

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
