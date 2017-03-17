import {Vision} from '../../shared/vision.model';

declare module '../../shared/vision.model' {
    interface Vision {
        editable?: boolean;
        revisable?: boolean;
    }
}
