import {Vision} from '../common/vision.model';

declare module '../common/vision.model' {
    interface Vision {
        activity: 'check' | 'approve';
    }
}
