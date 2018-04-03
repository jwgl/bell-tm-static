import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as _ from 'lodash';

import {CheckboxSelectorComponent} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {ReviewList} from 'core/models';
import {ApiUrl, Rest} from 'core/rest';

import {MentorSelectDialog} from './mentor/mentor-select.dialog';
import {PaperMentorService} from './paper-mentor.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class PaperMentorListComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    list: ReviewList;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private rest: Rest,
                private api: ApiUrl,
                private service: PaperMentorService,
                private dialog: Dialog) {
        route.data.subscribe((data: { list: ReviewList }) => {
            this.list = data.list;
        });
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    open() {
        this.dialog.open(MentorSelectDialog).then(result => {
            const idList = this.selectors.filter(s => s.checked).map(s => s.data.id);
            this.service.setMentor({ids: idList, teacherId: result})
            .subscribe(() => {
                this.router.navigate(['done']);
            });
        });
    }

    get mentorAble(): boolean {
        const match = window.location.href.match(/\/todo+/);
        return !_.isEmpty(match);
    }
}
