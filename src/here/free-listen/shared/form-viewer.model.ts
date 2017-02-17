import {Schedule} from '../../shared/schedule/schedule.model';

declare module '../../shared/schedule/schedule.model' {
    interface Schedule {
        belongsTo: 'student' | 'department';
    }
}
