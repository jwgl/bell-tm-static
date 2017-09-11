import { Component, ElementRef, ViewChild } from '@angular/core';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';

import { LegacyService } from '../legacy.service';
import { ListFilter } from '../shared/constant';

@Component({
    selector: 'legacy-list',
    styleUrls: ['legacy-list.component.scss'],
    templateUrl: 'legacy-list.component.html',
})
export class LegacyListComponent {
    _termId: number;
    terms: number[];
    types: string[];
    _type: number;
    list: any[];
    listFilter = ListFilter;
    filterSelected: any = {};
    count: number;
    max: number = 10;
    pagerArgs: any;

    constructor(
        private service: LegacyService,
        private dialog: CommonDialog) {
        service.loadList().subscribe(dto => {
            this._type = 1;
            this.terms = dto.terms;
            this.types = dto.types;
            this._termId = dto.termId;
            service.list = dto.list;
            this.doFilter();
        });
        this.filterSelected.name = '筛选';
    }

    set termId(value: number) {
        this._termId = value;
        this.service.loadList({ termId: value }).subscribe(dto => {
            this.service.list = dto.list;
            this.doFilter();
        });
    }

    get termId(): number {
        return this._termId;
    }

    set type(value: number) {
        this._type = value;
        this.doFilter();
    }

    get type(): number {
        return this._type;
    }

    loadData(offset: number) {
        this.pagerArgs = {offs: offset, max: this.max };
    }

    onFilterSelected(filterItem: any) {
        this.clearFilter();
        this.filterSelected.key = filterItem.key;
        this.filterSelected.name = filterItem.name;
    }

    doFilter() {
        this.list = this.service.list.filter((item: any) => {
            return item.observerType === this._type &&
                   (!this.filterSelected.key ||
                   item[this.filterSelected.key].indexOf(this.filterSelected.value) !== -1);
        });
        this.loadData(0);
        this.count = this.list.length;
    }

    clearFilter() {
        this.filterSelected = {};
        this.doFilter();
    }

    stateText(state: boolean) {
        return state ? '已发布' : '未发布';
    }

    get listLength(): number {
        return (this.pagerArgs.offs + this.max > this.count) ? this.count - this.pagerArgs.offs : this.max;
    }

    get offset(): number {
        return this.pagerArgs.offs;
    }
}
