import {LeaveForm} from '../../shared/form.model';
import * as _ from 'lodash';

declare module '../../shared/form.model' {
    interface LeaveForm {
        toServerDto(): any;
        isValid(): boolean;
    }
}

LeaveForm.prototype.isValid = function(this: LeaveForm): boolean {
    return true;
};

LeaveForm.prototype.toServerDto = function(this: LeaveForm): any {
    if (!this.id) {
        return {
        };
    } else {
        return {
        };
    }
};
