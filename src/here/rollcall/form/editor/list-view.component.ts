import {Component, Host, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';
import {RollcallType, RollcallTypes, RollcallTypeKeys, Student} from '../form.model';

const PageSize = 5;

@Component({
    styleUrls: ['list-view.component.scss'],
    templateUrl: 'list-view.component.html',
})
export class RollcallListViewComponent extends BaseRollcallView {
    @ViewChild('list') list: ElementRef;

    typeKeys = RollcallTypeKeys;

    operations: {[key: string]: () => void} = {
        'PageUp'    : this.prevPage,
        'PageDown'  : this.nextPage,
        'ArrowUp'   : this.prevItem,
        'ArrowLeft' : this.prevItem,
        'Up'        : this.prevItem,
        'Left'      : this.prevItem,
        'ArrowDown' : this.nextItem,
        'ArrowRight': this.nextItem,
        'Down'      : this.nextItem,
        'Right'     : this.nextItem,
        'Home'      : this.first,
        'End'       : this.last,
        'Enter'     : this.toggleLocal,
        '1'         : this.toggleAbsent,
        '2'         : this.toggleLate,
        '3'         : this.toggleEarly,
        '4'         : this.toggleAttend,
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
        @Host() editor: RollcallFormEditorComponent,
    ) {
        super(editor);
    }

    hasType(student: Student, key: string): boolean {
        return RollcallType.contains(student.rollcallType, key);
    }

    label(key: string): string {
        return RollcallTypes[key].text;
    }

    onClick(student: Student) {
        this.rollcallForm.setActive(student);
        this.scrollItem(true);
    }

    onKeydown(event: KeyboardEvent) {
        let operation = this.operations[event.key];
        if (operation) {
            operation.bind(this)();
            this.scrollItem();
        }
    }

    prevPage() {
        this.rollcallForm.activatePrev(PageSize);
    }

    nextPage() {
        this.rollcallForm.activateNext(PageSize);
    }

    prevItem() {
        this.rollcallForm.activatePrev();
    }

    nextItem() {
        this.rollcallForm.activateNext();
    }

    first() {
        this.rollcallForm.activateFirst();
    }

    last() {
        this.rollcallForm.activateLast();
    }

    toggleAbsent() {
        this.toggleLocal('absent');
    }

    toggleLate() {
        this.toggleLocal('late');
    }

    toggleEarly() {
        this.toggleLocal('early');
    }

    toggleAttend() {
        this.toggleLocal('attend');
    }

    toggleLocal(type?: string) {
        let student = this.rollcallForm.activeStudent;
        if (student.pending) {
            return;
        }

        if (student.isFreeListen || student.isCancelExam) {
            return;
        }

        if (student.leaveRequest) {
            if (!type) {
                window.open(`../../leaves/${student.leaveRequest.id}`, '_blank');
            }
            return;
        }

        if (type) {
            super.toggle(student, type);
        } else {
            if (student.rollcallItem) {
                for (let i = 0; i < this.typeKeys.length; i++) {
                    let key = this.typeKeys[i];
                    if (student.rollcallItem.type === RollcallTypes[key].value ||
                        student.rollcallItem.type === RollcallType.LateEarly &&
                        RollcallTypes[key].value === RollcallType.Early) {
                        super.toggle(student, key);
                        break;
                    }
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
