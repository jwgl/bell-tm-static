/* tslint:disable:no-unused-variable */
import {BookingForm} from '../../shared/form.model';
/* tslint:enable:no-unused-variable */

declare module '../../shared/form.model' {
    interface BookingForm {
        activity: string;
    }
}
