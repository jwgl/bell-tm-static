import * as _ from 'lodash';

import {LeaveType, LeaveTypeNames} from '../../leave/shared/form.model';

export enum RollcallType {
    None = 0,
    Absent = 1,
    Late = 2,
    Early = 3,
    LateEarly = 5,
    Attend = 6,
}

// {0: 'none', 1: 'absent', ...}
const RollcallTypeNames = _.fromPairs(_.toPairs(RollcallType).filter(p => !/\d+/.test(p[0])).map(p => [p[1], _.camelCase(p[0])]));

// {'none': 0, absent: 0, ...}
const RollcallTypeCounts = _.transform(RollcallTypeNames, (result, value) => result[value] = 0);

export const RollcallActions: { [key: string]: { label: string, value: RollcallType } } = {
    'absent': { label: '旷课', value: RollcallType.Absent },
    'late':   { label: '迟到', value: RollcallType.Late },
    'early':  { label: '早退', value: RollcallType.Early },
    'attend': { label: '调课', value: RollcallType.Attend },
};

export const RollcallActionsKeys = ['absent', 'late', 'early', 'attend'];

export namespace RollcallType {
    export function contains(type: RollcallType, key: string) {
        return type === RollcallActions[key].value ||
               type === RollcallType.LateEarly && (key === 'late' || key === 'early');
    }
}

// RollcallType -> {key: string, label: string}[]
// {
//    1: [{key: 'absent', label: '旷课'}],
//       ...
//    5: [{key: 'late',   label: '迟到}, {key: 'Early', label: {'早退'}]
// }
const RollcallLabels = _.transform(RollcallTypeNames, (result, value, key) => {
    result[key] = RollcallActionsKeys.filter(ak => {
        return key === RollcallActions[ak].value.toString() ||
               key === RollcallType.LateEarly.toString() && (ak === 'late' || ak === 'early')
    }).map(ak => ({
        key: ak,
        label: RollcallActions[ak].label,
    }));
}, <{[k: string]: {key: string, label: string}[]}>{});

export interface RollcallConfig {
    hideFree: boolean;
    hideLeave: boolean;
    hideCancel: boolean;
    random: number;
    view: string;
}

interface RollcallDto {
    id: number;
    studentId: string;
    type: RollcallType;
}

export class Rollcall {
    id: number;
    type: RollcallType;

    constructor(dto: RollcallDto) {
        this.id = dto.id;
        this.type = dto.type;
    }

    get lables(): {key: string, label: string}[] {
        return RollcallLabels[this.type];
    }

    get cancelKey(): string {
        if (this.type === RollcallType.LateEarly) {
            return 'early';
        } else {
            return RollcallActionsKeys.find(it => this.type === RollcallActions[it].value);
        }
    }

    toggle(type: RollcallType): ToggleResult {
        console.log(type);
        if (this.type === type) {
            return { op: 'delete' };
        }

        if (this.type === RollcallType.LateEarly) {
            if (type === RollcallType.Late) {
                type = RollcallType.Early;
            } else if (type === RollcallType.Early) {
                type = RollcallType.Late;
            }
        } else if (this.type === RollcallType.Late && type === RollcallType.Early ||
                   type === RollcallType.Late && this.type === RollcallType.Early) {
            type = RollcallType.LateEarly;
        }
        return { op: 'update', type: type };
    }
}

interface AbsenceDto {
    id: number;
    studentId: string;
}

abstract class Absence {
    constructor(public id: number) {}
    abstract get label(): string;
    abstract get url(): string;
}


interface StudentLeaveDto extends AbsenceDto {
    type: LeaveType;
}

class StudentLeave extends Absence {
    type: LeaveType;

    constructor(dto: StudentLeaveDto) {
        super(dto.id);
        this.type = dto.type;
    }

    get label(): string {
        return LeaveTypeNames[this.type];
    }

    get url(): string {
        return 'leaves';
    }
}

interface FreeListenDto extends AbsenceDto {}

class FreeListen extends Absence {
    constructor(dto: FreeListenDto) {
        super(dto.id);
    }

    get label(): string {
        return '免听';
    }

    get url(): string {
        return 'freeListens';
    }
}

interface CancelExamDto extends AbsenceDto {}

class CancelExam extends Absence {
    id: number;
    constructor(dto: CancelExamDto) {
        super(dto.id);
    }

    get label(): string {
        return '取消考试';
    }

    get url(): string {
        return 'cancelExams';
    }
}

export interface RollcallFormDto {
    students: any[];
    rollcalls: RollcallDto[];
    leaves: StudentLeaveDto[];
    freeListens: FreeListenDto[];
    cancelExams: CancelExamDto[];
    locked: boolean;
}

export interface ToggleResult {
    op: 'insert' | 'update' | 'delete' | 'none';
    type?: RollcallType;
}

export class Student {
    index: number;
    id: string;
    name: string;
    taskScheduleId: string;
    adminClass: string;
    subject: string;
    statis: number[];
    rollcall: Rollcall;
    absence: Absence;
    visible = true;
    pending = false;

    constructor(index: number, dto: any) {
        this.index = index;
        this.id = dto.id;
        this.name = dto.name;
        this.taskScheduleId = dto.taskScheduleId;
        this.adminClass = dto.adminClass;
        this.subject = dto.subject;
        this.statis = [0, 0, 0, 0];
    }

    toggle(key: string): ToggleResult {
        if (this.pending || this.absence) {
            return { op: 'none' };
        }

        // List view中按回车键时key为空
        if (!key) {
            key = this.rollcall ? this.rollcall.cancelKey : 'absent';
        }

        let currType = RollcallActions[key].value;
        return this.rollcall ? this.rollcall.toggle(currType) : { op: 'insert', type: currType };
    }

    get rollcallType(): RollcallType {
        return this.rollcall ? this.rollcall.type : RollcallType.None;
    }
}


export class RollcallForm {
    students: Student[] = [];
    config: RollcallConfig;
    locked: boolean;
    visibleStudents: Student[] = [];

    summaryCounter = {
        total: 0,
        free: 0,
        leave: 0,
        cancel: 0,
        visible: 0,
    };

    activeIndex = 0;

    private studentsMap: { [key: string]: Student } = {};

    constructor(dto: RollcallFormDto, config: RollcallConfig) {
        this.config = config;
        this.locked = dto.locked;

        dto.students.forEach((s, index) => {
            let student = new Student(index + 1, s);
            this.studentsMap[student.id] = student;
            this.students.push(student);
        });

        this.summaryCounter.total = this.students.length;

        dto.rollcalls.forEach(it => {
            const student = this.studentsMap[it.studentId];
            student.rollcall = new Rollcall(it);
        });

        dto.leaves.forEach(it => {
            const student = this.studentsMap[it.studentId];
            student.absence = new StudentLeave(it);
            this.summaryCounter.leave++;
        });

        dto.freeListens.forEach(it => {
            const student = this.studentsMap[it.studentId];
            student.absence = new FreeListen(it);
            this.summaryCounter.free++;
        });

        dto.cancelExams.forEach(it => {
            const student = this.studentsMap[it.studentId];
            student.absence = new CancelExam(it);
            this.summaryCounter.cancel++;
        });

        this.applyConfig();

    }

    activateNext(step = 1): void {
        this.activeIndex += step;
        if (this.activeIndex >= this.visibleStudents.length) {
            this.activeIndex -= this.visibleStudents.length;
        }
    }

    activatePrev(step = 1): void {
        this.activeIndex -= step;
        if (this.activeIndex < 0) {
            this.activeIndex += this.visibleStudents.length;
        }
    }

    activateFirst(): void {
        this.activeIndex = 0;
    }

    activateLast(): void {
        this.activeIndex = this.visibleStudents.length - 1;
    }

    activateStudent(student: Student): void {
        this.activeIndex = this.visibleStudents.indexOf(student);
    }

    get activeStudent(): Student {
        return this.visibleStudents[this.activeIndex];
    }

    get summary(): any {
        let counters = _.countBy(this.visibleStudents, s => {
            if (s.rollcall) {
                return RollcallTypeNames[s.rollcall.type];
            } else {
                return RollcallTypeNames[RollcallType.None];
            }
        });

        return _.defaults(counters, this.summaryCounter, RollcallTypeCounts);
    }

    applyConfig(): void {
        this.students.forEach(student => {
            if (student.absence instanceof CancelExam) {
                student.visible = !this.config.hideCancel;
            } else if (student.absence instanceof FreeListen) {
                student.visible = !this.config.hideFree;
            } else if (student.absence instanceof StudentLeave) {
                student.visible = !this.config.hideLeave;
            }
        });

        this.hideRandom();

        this.visibleStudents = this.students.filter(s => s.visible);
        this.summaryCounter.visible = this.visibleStudents.length;
    }

    private hideRandom() {
        let random = this.config.random;

        const normalStudents = this.students.filter(student => !student.absence);

        if (random < 10 || random > 90) {
            normalStudents.forEach(student => student.visible = true);
            return;
        }

        // 统计迟到旷课早退次数,清除之前的随机
        let statis: number[] = [];
        normalStudents.forEach((student, index) => {
            statis[index] = student.statis[0] + student.statis[1] + student.statis[2];
            student.visible = true;
        });

        // 随机选择，统计减1，达到-1则隐藏
        let total = normalStudents.length;
        let numberToHide = (100 - random) / 100 * total;
        let count = 0;
        while (numberToHide > 0) {
            let index = Math.floor(Math.random() * total);
            if (statis[index] > -1) {
                statis[index]--;
                if (statis[index] === -1) {
                    normalStudents[index].visible = false;
                    numberToHide--;
                }
            }
        }
    }
}
