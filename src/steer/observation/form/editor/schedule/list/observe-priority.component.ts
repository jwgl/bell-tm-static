import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { typeahead } from 'core/utils/typeahead';

import { ScheduleService } from '../schedule.service';

interface TeacherItem {
    teacherId: string;
    teacherName: string;
    departmentName: string;
    academicTitle: string;
    courseName: string;
    isnew?: string;
    hasSupervisor?: string;
}

const ListFilter = [
    { key: 'departmentName', name: '学院' },
    { key: 'teacherName', name: '姓名' },
    { key: 'isnew', name: '首次开课' },
    { key: 'courseName', name: '开课信息' },
];

@Component({
    selector: 'observe-priority-list',
    templateUrl: 'observe-priority.component.html',
})
export class ObservePriorityListComponent {
    list: TeacherItem[];
    count: number;
    pagerArgs: any;
    max: number = 10;
    listFilter = ListFilter;
    filterSelected: any = {};

    constructor(
        private service: ScheduleService,
    ) {
        this.filterSelected.name = '筛选';
        this.service.teacherActiveList().subscribe(dto => {
            this.service.list = dto.list;
            this.list = dto.list;
            this.count = this.list.length;
            this.loadData(0);
        });
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
        this.list = this.service.list.filter((item: any) => this.match(item));
        this.loadData(0);
        this.count = this.list.length;
    }

    clearFilter() {
        this.filterSelected = {};
        this.list = this.service.list;
        this.count = this.list.length;
        this.loadData(0);
    }

    match(item: any) {
        let value = '';
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.filterSelected.key === 'isnew') {
            value = item.isnew ? '是' : '否';
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
