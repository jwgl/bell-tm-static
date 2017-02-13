import {FreeListenForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface FreeListenForm {
        editable: boolean;
    }
}
