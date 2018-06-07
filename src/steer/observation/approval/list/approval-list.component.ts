import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { CheckboxSelectorComponent } from 'core/common-directives';
import { ListGroup, ListOption } from '../common/list-group.model';

import { ObservationItem } from '../../form/shared/form-list.model';
import { ApprovalService } from '../approval.service';

@Component({
    selector: 'approval-list',
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class ApprovalListComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    list: ObservationItem[];
    _list: ObservationItem[];
    terms: any[];
    _termId: number;
    activeTermId: number;
    filterSelected: any = {};
    counts: any;
    max: number = 999;

    options: ListOption[];
    _mode: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ApprovalService,
        private dialog: CommonDialog) {
        const mode = this._mode = this.route.snapshot.data['mode'];
        this.loadData(null, mode);
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    set termId(termId: number) {
        this._termId = termId;
        this.loadData(termId, this._mode);
    }

    get termId(): number {
        return this._termId;
    }

    loadData(_termId: number, mode: string) {
        this.service.loadList({ termId: this._termId, status: this.status }).subscribe(dto => {
            this.list = this._list = dto.list;
            if (!this.terms) {
                this.terms = dto.term;
                this.activeTermId = this._termId = dto.activeTermId;
            }
            this.counts = dto.counts;
            this.options = [
                {
                    type: 'tobe', label: '未发布', class: 'badge-warning',
                    count: this.counts.todo, active: !mode ? true : mode === 'tobe',
                },
                {
                    type: 'done', label: '已发布', class: 'badge-danger', count: this.counts.done,
                    active: !mode ? false : mode === 'done',
                },
            ];
        });
    }

    onFilterSelected(filter: any) {
        this.filterSelected = filter;
    }

    doFilter() {
        this.list = this._list.filter(item =>
            item.teacherName.indexOf(this.filterSelected.value) !== -1 ||
            item.course.indexOf(this.filterSelected.value) !== -1 ||
            item.departmentName.indexOf(this.filterSelected.value) !== -1 ||
            item.evaluateLevel === this.filterSelected.value,
        );
    }

    feedAll() {
        this.dialog.confirm('发布', '确定要发布吗？').then(() => {
            const list = this.selectors.filter(s => s.checked).map(s => s.data.id);
            if (list) {
                this.service.update(0, { ids: list }).subscribe(() => {
                    this.router.navigate(['/list/tobe']);
                });
            }
        });
    }

    get canFeed(): boolean {
        return (!this._mode || this._mode === 'tobe') && (this.activeTermId === this._termId);
    }

    get status(): number {
        return (this._mode && this._mode === 'done') ? 2 : 1;
    }
}
