import { Component, ElementRef, ViewChild } from '@angular/core';

import * as _ from 'lodash';

import { ObserverTypes, StatusText } from '../../shared/constant';
import { ObservationFormService } from '../form.service';
import { ListFilter, ObservationItem } from '../shared/form-list.model';

@Component({
    selector: 'observation-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class ObservationListComponent {
    list: ObservationItem[];
    listFilter = ListFilter;
    filterSelected: any = {};
    isAdmin: boolean;
    terms: number[];
    _termId: number;
    count: number;
    max: number = 10;
    pagerArgs: any;

    constructor(
        private service: ObservationFormService) {
        service.loadList({ termId: null }).subscribe(dto => {
            this.isAdmin = dto.isAdmin;
            this.terms = dto.terms;
            this._termId = dto.activeTerm;
            service.list = dto.list;
            this.doFilter();
        });
        this.filterSelected.name = '筛选';
    }

    loadData(offset: number) {
        this.pagerArgs = {offs: offset, max: this.max };
    }

    onFilterSelected(filterItem: any) {
        this.clearFilter();
        this.filterSelected.key = filterItem.key;
        this.filterSelected.name = filterItem.name;
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

    doFilter() {
        this.list = this.filterSelected.key
                  ? this.service.list.filter((item: any) => this.match(item))
                  : this.service.list;
        this.loadData(0);
        this.count = this.list.length;
    }

    get unsubmitCount(): number {
        if (!this.list) {
            return 0;
        } else {
            const unsubmitList = this.list.filter(item => !item.status);
            return unsubmitList ? unsubmitList.length : 0;
        }
    }

    clearFilter() {
        this.filterSelected = {};
        this.doFilter();
    }

    match(item: any): boolean {
        let value = '';
        if (this.filterSelected.key === 'status') {
            value = StatusText[item.status];
        } else if (this.filterSelected.key === 'observerType') {
            value = ObserverTypes.map(data => data.name)[item.observerType - 1];
        } else {
            value = item[this.filterSelected.key];
        }
        return value.indexOf(this.filterSelected.value) !== -1;
    }

    get listLength(): number {
        return (this.pagerArgs.offs + this.max > this.count) ? this.count - this.pagerArgs.offs : this.max;
    }

    get offset(): number {
        return this.pagerArgs.offs;
    }
}
