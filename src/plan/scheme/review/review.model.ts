import {Scheme} from '../shared/scheme.model';

declare module '../shared/scheme.model' {
    interface Scheme {
        activity: 'check' | 'approve';

        initReview(): void;
    }
}
