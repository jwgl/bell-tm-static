import {Schedule} from '../../shared/schedule/schedule.model';

declare module '../../shared/schedule/schedule.model' {
    interface Schedule {
        repeatType: number;
    }
}
