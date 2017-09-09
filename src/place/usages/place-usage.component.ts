import {Component, OnInit} from '@angular/core';

import {Place, PlaceUsage} from './place-usage.model';
import {PlaceUsageService} from './place-usage.service';

@Component({
    selector: 'place-usages-container',
    styleUrls: ['place-usage.component.scss'],
    templateUrl: 'place-usage.component.html',
})
export class PlaceUsageComponent implements OnInit {
    term: {startWeek: number, maxWeek: number};

    buildings: string[];
    places: Place[];

    selectedBuilding: string;
    selectedPlace: Place;

    usageMap: {[key: number]: {[key: number]: PlaceUsage[]}};

    rows = [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    cols = [1, 2, 3, 4, 5, 6, 7];
    spans = {
        1: {span: 4, text: '上午'},
        0: {span: 1, text: '中午'},
        5: {span: 5, text: '下午'},
        10: {span: 4, text: '晚上'},
    };

    TYPES = {
        jy: {label: '借用', class: 'badge-success'},
        pk: {label: '上课', class: 'badge-primary'},
        bk: {label: '上课', class: 'badge-primary'},
        ty: {label: '体育', class: 'badge-primary'},
        qt: {label: '其它', class: 'badge-primary'},
        ks: {label: '考试', class: 'badge-danger'},
        fsks: {label: '考试', class: 'badge-danger'},
    };

    loading = false;

    constructor(private service: PlaceUsageService) {}

    ngOnInit() {
        this.loading = true;
        this.service.loadList().subscribe(data => {
            this.buildings = data.buildings;
            this.term = data.term;
            this.loading = false;
        });
    }

    buildingChanged(building: string, placeSelect: HTMLSelectElement) {
        placeSelect.selectedIndex = 0;
        placeSelect.disabled = true;
        this.selectedBuilding = building;
        this.loading = true;
        this.service.loadPlaces(building).subscribe(places => {
            this.places = places;
            placeSelect.disabled = false;
            this.usageMap = {};
            this.loading = false;
        });
    }

    placeChanged(placeId: string) {
        this.usageMap = {};
        this.loading = true;
        this.service.loadUsage(this.selectedBuilding, placeId).subscribe(placeUsages => {
            placeUsages.filter(placeUsage => placeUsage && !placeUsage.description.endsWith('【换教师】')).forEach(placeUsage => {
                for (let section = placeUsage.startSection ; section < placeUsage.startSection + placeUsage.totalSection; section++) {
                    if (!this.usageMap[section]) {
                        this.usageMap[section] = {};
                    }
                    if (!this.usageMap[section][placeUsage.dayOfWeek]) {
                        this.usageMap[section][placeUsage.dayOfWeek] = [];
                    }
                    this.usageMap[section][placeUsage.dayOfWeek].push(placeUsage);
                }
            });

            this.rows.forEach(i => {
                this.cols.forEach(j => {
                    this.timespanPlaceUsages(i, j).sort((a, b) => {
                        return a.startWeek -  b.startWeek || a.endWeek - b.endWeek || a.oddEven - b.oddEven;
                    });
                });
            });
            setTimeout(() => {
                $('[data-toggle="tooltip"]').tooltip({html: true});
            }, 10);
            this.loading = false;
        });
    }

    timespanPlaceUsages(startSection: number, dayOfWeek: number) {
        if (this.usageMap && this.usageMap[startSection] && this.usageMap[startSection][dayOfWeek]) {
            return this.usageMap[startSection][dayOfWeek];
        } else {
            return [];
        }
    }
}
