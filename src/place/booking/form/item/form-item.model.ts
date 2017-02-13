import {BookingForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface BookingForm {
        editable: boolean;
    }
}
