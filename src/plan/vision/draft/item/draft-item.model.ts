import {Vision} from '../../common/vision.model';

declare module '../../common/vision.model' {
    interface Vision {
        editable?: boolean;
        revisable?: boolean;
    }
}
