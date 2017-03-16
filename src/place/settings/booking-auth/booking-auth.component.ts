import {Component} from '@angular/core';
import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';
import {groupBy} from 'core/utils';

import {BookingAuthDialog} from './booking-auth.dialog';
import {BookingAuth, BookingType, Department, Teacher} from './booking-auth.model';
import {BookingAuthService} from './booking-auth.service';

@Component({
    selector: 'booking-auth-list',
    templateUrl: 'booking-auth.component.html',
})
export class BookingAuthComponent {
    departments: Department[];
    department: Department;
    types: BookingType[];
    auths: BookingAuth[];

    constructor(
        private dialog: Dialog,
        private commandDialog: CommonDialog,
        private service: BookingAuthService,
    ) {
        this.service.loadList().subscribe(data => {
            this.departments = data.departments;
            this.types = data.types;
            this.auths = data.auths;
            this.department = this.departments[0];
        });
    }

    create() {
        this.dialog.open(BookingAuthDialog, {
            department: this.department,
            types: this.availableTypes,
        }).then(result => {
            this.service.create({
                departmentId: result.department.id,
                typeId: result.type.id,
                checkerId: result.checker.id,
            }).subscribe(id => {
                this.auths.push({
                    id: parseInt(id, 10),
                    departmentId: this.department.id,
                    typeId: result.type.id,
                    typeName: result.type.name,
                    checkerId: result.checker.id,
                    checkerName: result.checker.name,
                    checkerPhone: result.checker.phone,
                });
            });
        });
    }

    edit(auth: BookingAuth) {
        this.dialog.open(BookingAuthDialog, {
            department: this.department,
            types: this.availableTypes,
            auth,
        }).then(result => {
            this.service.update(auth.id, {
                typeId: result.type.id,
                checkerId: result.checker.id,
            }).subscribe(id => {
                auth.typeId = result.type.id;
                auth.typeName = result.type.name;
                auth.checkerId = result.checker.id;
                auth.checkerName = result.checker.name;
                auth.checkerPhone = result.checker.phone;
            });
        });
    }

    delete(auth: BookingAuth) {
        this.commandDialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(auth.id).subscribe(() => {
                this.auths.splice(this.auths.indexOf(auth), 1);
            });
        });
    }

    filterByDepartment(department: Department) {
        return (auth: any) => auth.departmentId === department.id;
    }

    canCreate(): boolean {
        if (!this.types || !this.auths) {
            return false;
        }
        return this.availableTypes.length > 0;
    }

    get availableTypes() {
        return _.differenceWith(this.types.filter(it => it.isTeaching === this.department.isTeaching),
                                this.auths.filter(it => it.departmentId === this.department.id),
                                (a: any, b: any) => a.id === b.typeId);
    }
}
