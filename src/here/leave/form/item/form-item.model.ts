import {LeaveForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface LeaveForm {
        editable: boolean;
    }
}
