import {DeptAdminForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface DeptAdminForm {
        toServerDto(): any;
    }
}

DeptAdminForm.prototype.toServerDto = function(this: DeptAdminForm): any {
    return {
        departmentId: this.departmentId,
        teacherId: this.teacherId,
    };
};
