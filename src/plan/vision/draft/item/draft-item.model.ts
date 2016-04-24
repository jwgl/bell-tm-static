/* tslint:disable:no-unused-variable */
import {Vision} from '../../common/vision.model';
/* tslint:enable:no-unused-variable */

declare module '../../common/vision.model' {
    interface Vision {
        editable?: boolean;
        revisable?: boolean;
    }
}
