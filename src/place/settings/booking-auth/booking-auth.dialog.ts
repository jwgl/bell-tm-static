import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';
import {Rest} from 'core/rest';

import 'rxjs/add/operator/do';

import {BookingAuth, BookingType, Department, Teacher} from './booking-auth.model';
import {BookingAuthService} from './booking-auth.service';

@Component({
    templateUrl: 'booking-auth.dialog.html',
})
export class BookingAuthDialog extends BaseDialog {
    department: Department;
    type: BookingType;
    checker: Teacher;

    types: BookingType[];
    teachers: Teacher[];

    constructor(private service: BookingAuthService) {
        super();
    }

    get title(): string {
        return this.options.auth ? '编辑' : '新建';
    }

    typeCompare(t1: any, t2: any): boolean {
        return t1 && t2 && t1.id === t2.id;
    }

    checkerCompare(c1: any, c2: any): boolean {
        return c1 && c2 && c1.id === c2.id;
    }

    protected onOpening(): Observable<any> {
        this.department = this.options.department;
        this.types = this.options.types;

        const auth = this.options.auth as BookingAuth;
        if (auth) {
            this.type = {
                id: auth.typeId,
                name: auth.typeName,
                isTeaching: this.department.isTeaching,
            };
            this.types.unshift(this.type);
            this.checker = {
                id: this.options.auth.checkerId,
                name: this.options.auth.checkerName,
                phone: this.options.auth.checkerPhone,
            };
            return this.service.loadTeachers(this.department.id);
        } else {
            if (this.types && this.types.length > 0) {
                this.type = this.types[0];
            }
            return this.service.loadTeachers(this.department.id).do(data => {
                if (data && data.length > 0) {
                    this.checker = data[0];
                }
            });
        }
    }

    protected onConfirmed() {
        return {
            department: this.department,
            type: this.type,
            checker: this.checker,
        };
    }
}
