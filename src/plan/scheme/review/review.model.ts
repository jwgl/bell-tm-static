import {Scheme} from '../common/scheme.model';

declare module '../common/scheme.model' {
    interface Scheme {
        activity: 'check' | 'approve';

        initReview(): void;
    }
}
