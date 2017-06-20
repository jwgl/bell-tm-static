import * as _ from 'lodash';

import {
    dayOfWeekText,
    matchOddEven,
    oddEvenText,
    sectionRangeText,
    weekRangeText,
} from 'core/utils';

export const SPANS: {[key: number]: {
    span: number,
    label: string,
}} = {
    1  : {span: 4, label: '上午'},
    5  : {span: 5, label: '下午'},
    10 : {span: 4, label: '晚上'},
};

const SECTION_COUNT = _.chain(SPANS).mapValues((it: any) => it.span).values().sum().value();
const DAY_COUNT = 7;
const SECTIONS = _.range(1, SECTION_COUNT + 1);
const DAYS = _.range(1, DAY_COUNT + 1);
/**
 * 求数组的最小公倍数
 */
function lcdOfArray(array: number[]) {
    if (array.length === 1) {
        return array[0];
    } else {
        let result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = lcd(result, array[i]);
        }
        return result;
    }
}

/**
 * 求数组的最大公约数
 */
function lcd(a: number, b: number) {
    return a * b / gcd(a, b);
}

/**
 * 求两个数的最大公约数
 */
function gcd(a: number, b: number) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * 排课DTO
 */
export interface ScheduleDto {
    id: string;
    taskId: string;
    courseClassId: string;
    courseClassName: string;
    courseTeacherId: string;
    courseTeacherName: string;
    teacherId: string;
    teacherName: string;
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    place: string;
    courseItem: string;
}

interface SlotRange {
    dayOfWeek: number;
    startSection: number;
    endSection: number;
}

/**
 * 排课
 */
export class Schedule implements SlotRange {
    id: string;
    taskId: string;
    courseClassId: string;
    courseClassName: string;
    courseTeacherId: string;
    courseTeacherName: string;
    teacherId: string;
    teacherName: string;
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    courseItem: string;
    place: string;

    constructor(dto: ScheduleDto) {
        this.id = dto.id;
        this.taskId = dto.taskId;
        this.courseClassId = dto.courseClassId;
        this.courseClassName = dto.courseClassName;
        this.courseTeacherId = dto.courseTeacherId;
        this.courseTeacherName = dto.courseTeacherName;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.oddEven = dto.oddEven;
        this.dayOfWeek = dto.dayOfWeek;
        this.startSection = dto.startSection;
        this.totalSection = dto.totalSection;
        this.course = dto.course;
        this.courseItem = dto.courseItem;
        this.place = dto.place;
    }

    get endSection(): number {
        return this.startSection + this.totalSection - 1;
    }

    get timeslotId(): number {
        return this.startSection * 10 + this.totalSection;
    }

    constainsWeek(week: number): boolean {
        return week >= this.startWeek && week <= this.endWeek && matchOddEven(this.oddEven, week);
    }

    compare(other: Schedule) {
        return this.startWeek - other.startWeek
            || this.endWeek - other.endWeek
            || this.oddEven - other.oddEven;
    }
}

/* tslint:disable:max-classes-per-file */
export class Timetable {
    private _schedules: Schedule[];
    private _term: Term;
    private _week = 0;
    private _weeks: number[];
    private _dayColumns: {[key: number]: DayColumn};
    private _showWeeks: boolean;

    constructor(schedules: Schedule[], term: Term, showWeeks: boolean) {
        this._schedules = schedules;
        this._term = term;
        this._showWeeks = showWeeks;
        this._week = showWeeks ? term.currentWeek : 0;
        this._weeks = _.range(term.startWeek, term.endWeek + 1);
        this.buildTimeslots();
    }

    /**
     * 是否显示week tab
     */
    get tabEnabled(): boolean {
        return this._showWeeks;
    }

    /**
     * 周数组
     */
    get weeks(): number[] {
        return this._weeks;
    }

    /**
     * 获取当前选择周
     */
    get week(): number {
        return this._week;
    }

    /**
     * 设置当前选择周
     */
    set week(value: number) {
        this._week = value;
        this.buildTimeslots();
    }

    /**
     * 获取实际当前周
     */
    get currentWeek(): number {
        return this._term.currentWeek;
    }

    /**
     * 当前周字符串
     */
    get weekText(): string {
        if (this.week) {
            return `第${this.week}周`;
        } else {
            return `${this._term.startWeek}-${this._term.endWeek}周`;
        }
    }

    /**
     * 天数组
     */
    get days(): number[] {
        return DAYS;
    }

    /**
     * 节数组
     */
    get sections(): number[] {
        return SECTIONS;
    }

    /**
     * 指定节次是否为开始节
     */
    isStartSection(section: number): boolean {
        return !!SPANS[section];
    }

    /**
     * 指定节次的节区间
     */
    getSectionSpan(section: number): {span: number, label: string} {
        return SPANS[section];
    }

    /**
     * 获取指定天的列
     */
    getDayColumns(day: number): number[] {
        return this._dayColumns[day] ? this._dayColumns[day].columns : [0];
    }

    /**
     * 获取指定天的实际列的数量
     */
    getDayColumnCount(day: number): number {
        return this._dayColumns[day] ? this._dayColumns[day].columnCount : 1;
    }

    /**
     * 获取timeslot
     */
    getTimeslot(day: number, start: number, column: number): Timeslot | null {
        return !this._dayColumns[day] ? null : this._dayColumns[day].getTimeslot(start, column);
    }

    /**
     * 表的单元格是否隐藏
     */
    isHidden(day: number, start: number, column: number): boolean {
        return !!this._dayColumns[day] && this._dayColumns[day].isHidden(start, column);
    }

    /**
     * 获取指定周的所有timeslot
     */
    getTimeslots(week: number): Timeslot[] {
        if (this._week !== week) {
            this._week = week;
            this.buildTimeslots();
        }
        return _.chain(this._dayColumns).values().flatMap((it: DayColumn) => _.values(it.timeslots)).value();
    }

    /**
     * 获取指定包含timeslot的周次。由于当前可能已过week进行了过滤，
     * 所以不能从_dayColumns直接获取，而是从原始__schedules获取。
     */
    getTimeslotWeeks(timeslot: Timeslot): number[] {
        return _.chain(this._schedules).filter(it => {
            return it.dayOfWeek === timeslot.dayOfWeek
                && it.startSection === timeslot.startSection
                && it.totalSection === timeslot.totalSection;
        }).flatMap(it => {
            return _.range(it.startWeek, it.endWeek + 1).filter(w => matchOddEven(it.oddEven, w));
        }).uniq().sort(_.subtract).value();
    }

    /**
     * 构造timeslot
     */
    private buildTimeslots(): void {
        this._dayColumns = {};

        this._schedules.forEach(schedule => {
            if (!this._week || schedule.constainsWeek(this._week)) {
                const dayColumn = this._dayColumns[schedule.dayOfWeek];
                if (dayColumn) {
                    dayColumn.add(schedule);
                } else {
                    this._dayColumns[schedule.dayOfWeek] = new DayColumn(schedule);
                }
            }
        });

        Object.keys(this._dayColumns).map(Number).forEach(day => {
            this._dayColumns[day].compact();
        });
    }
}

/**
 * 天列，包含某一天的排课数据
 */
export class DayColumn {
    day: number;
    timeslots: {[key: number]: Timeslot} = {};
    normalized: {[key: number]: Timeslot};

    /**
     * 实际列数量
     */
    columnCount: number;

    /**
     * 需要隐藏的单元映射，key为开始节 * 10 + 实际列
     */
    hiddens: {[key: number]: boolean};
    columns: number[];

    constructor(schedule: Schedule) {
        this.day = schedule.dayOfWeek;
        this.timeslots[schedule.timeslotId] = new Timeslot(schedule);
    }

    /**
     * 插入排课
     */
    add(schedule: Schedule) {
        if (schedule.dayOfWeek !== this.day) {
            throw new Error('Error day of week for this column.');
        }

        const timeslot = this.timeslots[schedule.timeslotId];
        if (timeslot) {
            timeslot.add(schedule);
        } else {
            this.timeslots[schedule.timeslotId] = new Timeslot(schedule);
        }
    }

    /**
     * 获取Timeslot
     */
    getTimeslot(start: number, column: number): Timeslot {
        return this.normalized[start * 10 + column];
    }

    /**
     * 判断指定开始节和列上是否存隐藏
     */
    isHidden(start: number, column: number): boolean {
        return this.hiddens[start * 10 + column];
    }

    /**
     * 压缩已填充的timeslots
     */
    compact(): void {
        const daySpans: {[start: number]: Timeslot[][]} = {};

        const starts = Object.keys(SPANS).map(Number);
        starts.forEach(start => {
            const span = SPANS[start].span;
            const columns: Timeslot[][] = [];
            for (let i = start; i < start + span; i++) {
                // span中的逻辑列索引
                let columnIndex = 0;
                for (let j = span; j >= 1; j--) {
                    const timeslot = this.timeslots[i * 10 + j];
                    if (timeslot) {
                        while (true) {
                            let column = columns[columnIndex];
                            if (!column) {
                                columns[columnIndex] = column = [];
                            }
                            if (column.some(s => s.intersect(timeslot))) {
                                columnIndex++;
                            } else {
                                column.push(timeslot);
                                break;
                            }
                        }
                    }
                }
            }
            daySpans[start] = columns;
        });

        // 总列数为所有span的逻辑列的最小公倍数
        this.columnCount = lcdOfArray(starts.map(s => daySpans[s].length).filter(l => l > 0));
        this.columns = _.range(this.columnCount);

        // normalize timeslot
        this.normalized = {};
        starts.forEach(s => {
            const columns = daySpans[s];
            columns.forEach((column, columnIndex) => {
                column.forEach(timeslot => {
                    timeslot.columnUnit = this.columnCount / columns.length;
                    timeslot.columnSpan = 1;
                    timeslot.columnIndex = columnIndex;
                    this.normalized[timeslot.normalizedId] = timeslot;
                    // 如果当前timeslot右侧还有可用空间，则扩展
                    for (let j = columnIndex + 1; j < columns.length; j++) {
                        if (columns[j].some(t => t.intersect(timeslot))) {
                            break;
                        } else {
                            timeslot.columnSpan++;
                        }
                    }
                });
            });
        });

        // build hiddens
        this.hiddens = {};
        Object.keys(this.timeslots).map(Number).forEach(id => {
            const timeslot = this.timeslots[id];
            for (let i = 0; i < timeslot.totalSection; i++) {
                for (let j = 0; j < timeslot.columnUnit * timeslot.columnSpan; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    this.hiddens[(timeslot.startSection + i) * 10 + timeslot.columnUnit * timeslot.columnIndex + j] = true;
                }
            }
            timeslot.sort();
        });
    }
}

/**
 * Timeslot代表星期几、起始节和节长。
 */
export class Timeslot {
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    items: TimeslotItem[] = [];

    /**
     * 逻辑列单元，表示一个逻辑列占几个实际列
     */
    columnUnit: number;

    /**
     * 逻辑列区间，表示当前timeslot占几个逻辑列
     */
    columnSpan: number;

    /**
     * 逻辑列索引，表示当前timeslot开始逻辑列的索引
     */
    columnIndex: number;

    private _id: number;

    constructor(schedule: Schedule) {
        this.dayOfWeek = schedule.dayOfWeek;
        this.startSection = schedule.startSection;
        this.totalSection = schedule.totalSection;
        this._id = this.dayOfWeek * 10000 + this.startSection * 100 + this.totalSection;

        this.items.push(new TimeslotItem(schedule));
    }

    /**
     * 判断Timeslot是否与slotRange相交
     */
    intersect(range: SlotRange): boolean {
        return this.dayOfWeek === range.dayOfWeek && (
               this.startSection <= range.startSection && this.endSection >= range.startSection
            || this.endSection >= range.endSection && this.startSection <= range.endSection);
    }

    /**
     * 插入排课
     */
    add(schedule: Schedule): void {
        if (this.dayOfWeek !== schedule.dayOfWeek ||
            this.startSection !== schedule.startSection ||
            this.endSection !== schedule.endSection) {
            throw new Error('Schedule does not belong to this timeslot.');
        }

        const item = this.items.find(it => it.intersect(schedule));
        if (item) {
            item.add(schedule);
        } else {
            this.items.push(new TimeslotItem(schedule));
        }
    }

    /**
     * 对timeslot中的items排序
     */
    sort(): void {
        this.items.forEach(it => it.sort());
        this.items.sort((a, b) => a.compare(b));
    }

    /**
     * timeslot ID
     */
    get id(): number {
        return this._id;
    }

    /**
     * 实际列区间
     */
    get colSpan(): number {
        return this.columnUnit * this.columnSpan;
    }

    /**
     * 开始节与实例列构成的ID
     */
    get normalizedId(): number {
        return this.startSection * 10 + this.columnUnit * this.columnIndex;
    }

    /**
     * 结束节
     */
    get endSection(): number {
        return this.startSection + this.totalSection - 1;
    }

    /**
     * timeslot的文本表示
     */
    get label(): string {
        const courses = _.chain(this.items).map(it => {
            return it.courseItem ? `${it.course}-${it.courseItem}` : `${it.course}`;
        }).uniq().value().join(', ');
        return `周${dayOfWeekText(this.dayOfWeek)} ${sectionRangeText(this)} ${courses}`;
    }
}

/**
 * 用于合并多个排课，相同课程（课程项）进行合并。
 */
export class TimeslotItem {
    schedules: Schedule[] = [];

    constructor(schedule: Schedule) {
        this.schedules.push(schedule);
    }

    /**
     * 判断排课是否属于当前item
     */
    intersect(schedule: Schedule): boolean {
        const exists = this.schedules[0];
        return exists.startSection === schedule.startSection
            && exists.totalSection === schedule.totalSection
            && exists.course.localeCompare(schedule.course) === 0
            && (exists.courseItem === null && schedule.courseItem === null
             || exists.courseItem !== null && schedule.courseItem !== null
             && exists.courseItem.localeCompare(schedule.courseItem) === 0);
    }

    /**
     * 插入排课
     */
    add(schedule: Schedule): void {
        this.schedules.push(schedule);
    }

    /**
     * 比较
     */
    compare(other: TimeslotItem): number {
        return this.schedules[0].startWeek - other.schedules[0].startWeek
            || this.schedules[0].oddEven - other.schedules[0].oddEven
            || this.course.localeCompare(other.course)
            || this.startSection - other.startSection
            || this.endSection - other.endSection;
    }

    /**
     * 对当前item中包含的排课进行排序
     */
    sort(): void {
        this.schedules.sort((a, b) => a.compare(b));
    }

    get weeksText(): string {
        if (this.schedules.length === 1) {
            const it = this.schedules[0];
            return it.startWeek === it.endWeek
                ? `第${it.startWeek}周`
                : `${it.startWeek}-${it.endWeek}${oddEvenText(it.oddEven)}周`;
        } else {
            const weeks = _.chain(this.schedules).map(it => {
                return it.startWeek === it.endWeek
                     ? `${it.startWeek}`
                     : `${it.startWeek}-${it.endWeek}${oddEvenText(it.oddEven)}`;
            }).uniq().sort().join(',');
            return `${weeks}周`;
        }
    }

    get sectionsText(): string {
        return sectionRangeText(this);
    }

    get startSection(): number {
        return this.schedules[0].startSection;
    }

    get endSection(): number {
        return this.schedules[0].endSection;
    }

    get totalSection(): number {
        return this.schedules[0].totalSection;
    }

    get course(): string {
        return this.schedules[0].course;
    }

    get courseItem(): string {
        return this.schedules[0].courseItem;
    }

    get place(): string {
        return _.uniq(this.schedules.map(it => it.place)).join('/');
    }

    get teachers(): string {
        return _.uniq(this.schedules.map(it => it.teacherName)).join('/');
    }
}

export interface Term {
    startWeek: number;
    endWeek: number;
    currentWeek: number;
}
