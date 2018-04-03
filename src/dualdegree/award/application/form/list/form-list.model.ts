import {AwardForm} from '../../../shared/form.model';

declare module '../../../shared/form.model' {
    interface AwardForm {
        status: string;
        applicationId: number;
    }
}
