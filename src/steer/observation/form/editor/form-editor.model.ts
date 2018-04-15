import * as moment from 'moment';

import { EvaluationMap, ObservationForm, Term } from '../shared/form.model';

declare module '../shared/form.model' {
    interface ObservationForm {
        toServerDto(evaluationSystem: EvaluationMap[], term: Term): any;
        getObservationDate(term: Term): string;
    }
}

ObservationForm.prototype.getObservationDate = function(this: ObservationForm, term: Term): string {
    if (!term) {
        return null;
    } else {
        const day = moment(term.startDate);
        day.add(this.observationWeek - term.startWeek, 'weeks');
        day.add(this.schedule.dayOfWeek - 1, 'days');
        return day.format('YYYY-MM-DD');
    }
};

ObservationForm.prototype.toServerDto = function(this: ObservationForm, evaluationSystem: EvaluationMap[], term: Term): any {
    const evList: any[] = [];
    evaluationSystem.forEach(item => {
        item.value.forEach(data => {
            evList.push({ id: data.id, value: data.value });
        });
    });
    return {
        teacherId: this.schedule.teacherId,
        observationWeek: this.observationWeek,
        totalSection: this.totalSection,
        teachingMethods: this.teachingMethods,
        supervisorDate: this.getObservationDate(term),
        observerType: this.observerType,
        place: this.schedule.place,
        earlier: this.earlier,
        late: this.late,
        leave: this.leave,
        dueStds: this.schedule.studentCount,
        attendantStds: this.attendantStds,
        lateStds: this.lateStds,
        leaveStds: this.leaveStds,
        evaluateLevel: this.evaluateLevel,
        evaluations: evList,
        evaluationText: this.evaluationText,
        suggest: this.suggest,
        status: this.status,
        observerId: this.observerId,
        dayOfWeek: this.schedule.dayOfWeek,
        startSection: this.schedule.startSection,
        isScheduleTemp: this.isScheduleTemp,
    };
};
