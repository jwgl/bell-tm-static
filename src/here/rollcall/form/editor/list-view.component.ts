import {Component, OnInit, Host, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import * as $ from 'jquery';
import * as _ from 'lodash';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';
import {RollcallType, RollcallTypes, RollcallTypeKeys, Student} from '../form.model';

@Component({
    styleUrls: ['list-view.component.scss'],
    templateUrl: 'list-view.component.html',
    host: {
        '(document: click)': 'focusList()',
    },
})
export class RollcallListViewComponent extends BaseRollcallView implements OnInit {
    typeKeys: string[];
    operations: {[key: string]: () => void} = {
        'PageUp'    : this.prevPage,
        'PageDown'  : this.nextPage,
        'ArrowUp'   : this.prevItem,
        'ArrowLeft' : this.prevItem,
        'ArrowDown' : this.nextItem,
        'ArrowRight': this.nextItem,
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
        this.typeKeys = RollcallTypeKeys;
    }

    ngOnInit() {
        this.editor.formLoaded.subscribe(() => {
            this.focusList();
        });
        this.focusList();
    }

    focusList() {
        setTimeout(() => {
            $('.list-pane').focus();
            this.scrollItem();
        });
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
        console.log(event.key);
        if (this.operations[event.key]) {
            this.operations[event.key].bind(this)();
            this.scrollItem();
        }
    }

    prevPage() {
        this.rollcallForm.activatePrev(5);
    }

    nextPage() {
        this.rollcallForm.activateNext(5);
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

    hasScroll($list: JQuery): boolean {
        return $list.height() < $list[$.fn.prop ? 'prop' : 'attr']('scrollHeight');
    }

    scrollItem(click = false) {
        let $list: JQuery = $('.list-pane ul');
        if (this.hasScroll($list)) {
            let itemCount = this.rollcallForm.visibleStudents.length;
            let itemIndex = this.rollcallForm.activeIndex;
            let listHeight = $list.height();
            let itemHeight = $list.children().first().height();
            let favorPosition = Math.floor(listHeight / itemHeight / 2);
            let favorHeight = favorPosition * itemHeight;
            let borderWidth = ($list.outerHeight() - $list.innerHeight()) / 2;
            let offset = $list.children().eq(itemIndex).offset().top - $list.offset().top - borderWidth;
            let scroll = $list.scrollTop();
            if (!click && itemIndex > favorPosition && offset < favorHeight) {
                $list.scrollTop(scroll + offset - favorHeight);
            } else if (offset < 0) {
                $list.scrollTop(scroll + offset);
            } else if (!click && itemIndex + favorPosition < itemCount && offset > favorHeight) {
                $list.scrollTop(scroll + offset - favorHeight);
            } else if (offset + itemHeight >= listHeight) {
                $list.scrollTop(scroll + offset - listHeight + itemHeight);
            }
        }
    }
}
