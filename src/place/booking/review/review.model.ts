/* tslint:disable:no-unused-variable */
import {BookingForm} from '../common/form.model';
/* tslint:enable:no-unused-variable */

declare module '../common/form.model' {
    interface BookingForm {
        activity: string;
    }
}
