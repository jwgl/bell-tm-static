import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';

import {BaseDialog} from 'core/dialogs';
import {NumberStringOption, OddEvenOptions} from 'core/options';
import {BookingSection} from '../../../common/form.model';
import {BookingFormService} from '../../form.service';

interface BookingDayOption {
    week: number;
    dayOfWeek: number;
    date: moment.Moment;
}

interface QueryOptions {
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    section: BookingSection;
    placeType: string;
}

@Component({
    selector: 'find-place-dialog',
    styleUrls: ['find-place.dialog.scss'],
    templateUrl: 'find-place.dialog.html',
})
export class FindPlaceDialog extends BaseDialog {
    term: {
        startWeek: number,
        maxWeek: number,
        currentWeek: number,
        startDate: moment.Moment,
        swapDates: moment.Moment[],
    };

    today: moment.Moment;

    vm: {
        simpleOption: boolean;
        startWeeks?: number[];
        endWeeks?: number[];
        oddEvens?: NumberStringOption[];
        dayOfWeeks?: NumberStringOption[];
        days?: BookingDayOption[];
    };

    queryOptions: QueryOptions;
    queryOptionsSnapshot: QueryOptions;

    _bookingDay: BookingDayOption;

    places: any[] = [];

    constructor(private service: BookingFormService) {
        super();
        moment.locale('zh-cn');
    }

    protected onOpening(): Observable<any> {
        this.term = {
            startWeek: this.options.term.startWeek,
            maxWeek: this.options.term.maxWeek,
            currentWeek: this.options.term.currentWeek,
            startDate: moment(this.options.term.startDate),
            swapDates: this.options.term.swapDates.map((it: string) => moment(it)),
        };

        this.today = moment(this.options.today);

        this.queryOptions = {
            section: this.options.sections[0],
            placeType: '多媒体教室',
            startWeek: this.term.currentWeek,
            endWeek: this.term.currentWeek,
            oddEven: 0,
            dayOfWeek: 1,
        };

        this.vm = {
            simpleOption: this.options.bookingDays !== 0 && this.options.bookingDays !== -1,
        };

        if (this.vm.simpleOption) {
            this.vm.days = [];

            let day = moment(this.today);
            let today = moment(this.today);

            if (today.isBefore(this.term.startDate)) {
                day = moment(this.term.startDate);
                today = moment(this.term.startDate);
            } else {
                day.add(1, 'day');
            }

            if (day.isAfter(moment(this.term.startDate).add(this.term.maxWeek, 'weeks'))) {
                return;
            }

            for (let i = 0; i < this.options.bookingDays; i++) {
                let week = this.term.currentWeek + day.isoWeek() - today.isoWeek();
                if (week < this.term.currentWeek) { // cross year
                    week += today.isoWeeksInYear();
                }
                if (week > this.term.maxWeek) {
                    break;
                }

                this.vm.days.push({
                    week: week,
                    dayOfWeek: day.isoWeekday(),
                    date: moment(day),
                });

                day.add(1, 'day');
            }

            if (this.vm.days.length > 0) {
                this.bookingDay = this.vm.days[0];
            }
        } else {
            this.vm.startWeeks = [];
            this.vm.endWeeks = [];
            this.vm.oddEvens = OddEvenOptions;
            this.vm.dayOfWeeks = [];

            for (let i = this.term.currentWeek; i <= this.term.maxWeek; i++) {
                if (this.options.bookingDays === -1 || this.options.bookingDays === 0 && i <= this.term.currentWeek + 2) {
                    this.vm.startWeeks.push(i);
                }
                this.vm.endWeeks.push(i);

            }

            for (let i = 1; i <= 7; i++) {
                this.vm.dayOfWeeks.push({
                    value: i,
                    label: moment.weekdays(i),
                });
            }

            this.queryOptions.startWeek = this.vm.startWeeks[0];
            this.queryOptions.endWeek = this.vm.endWeeks[0];
            this.queryOptions.oddEven = this.vm.oddEvens[0].value;
            this.queryOptions.dayOfWeek = this.vm.dayOfWeeks[0].value;
        }
        return null;
    }

    protected onConfirmed(): any {
        return this.places
                   .filter(it => it.selected)
                   .map(it => ({
                        startWeek: this.queryOptionsSnapshot.startWeek,
                        endWeek: this.queryOptionsSnapshot.endWeek,
                        oddEven: this.queryOptionsSnapshot.oddEven,
                        dayOfWeek: this.queryOptionsSnapshot.dayOfWeek,
                        section: this.queryOptionsSnapshot.section,
                        place: {
                            id: it.id,
                            name: it.name,
                            seat: it.seat,
                            type: this.queryOptionsSnapshot.placeType,
                        },
                    }));
    }

    get bookingDay(): BookingDayOption {
        return this._bookingDay;
    }

    set bookingDay(value: BookingDayOption) {
        this._bookingDay = value;
        this.queryOptions.startWeek = value.week;
        this.queryOptions.endWeek = value.week;
        this.queryOptions.oddEven = 0;
        this.queryOptions.dayOfWeek = value.dayOfWeek;
    }

    startWeekChanged(newValue: number) {
        if (newValue > this.queryOptions.endWeek) {
            this.queryOptions.endWeek = newValue;
        }
        this.queryOptions.startWeek = newValue;
    }

    endWeekChanged(newValue: number) {
        if (newValue < this.queryOptions.startWeek) {
            this.queryOptions.startWeek = newValue;
        }
        this.queryOptions.endWeek = newValue;
    }

    findPlace() {
        this.service.findPlace({
            startWeek: this.queryOptions.startWeek,
            endWeek: this.queryOptions.endWeek,
            oddEven: this.queryOptions.oddEven,
            dayOfWeek: this.queryOptions.dayOfWeek,
            sectionId: this.queryOptions.section.id,
            placeType: this.queryOptions.placeType,
        }).subscribe((data: any[]) => {
            this.queryOptionsSnapshot = _.clone(this.queryOptions);
            this.places = data;
        });
    }

    get selectedCount() {
        return this.places.filter(it => it.selected).length;
    }

    placeRowClicked(event: Event, place: any) {
        if (!(event.target instanceof HTMLInputElement)) {
            place.selected = !place.selected;
        }
    }
}
