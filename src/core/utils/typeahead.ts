import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

export function typeahead(element: ElementRef, minLength = 1, debounceTime = 250): Observable<string> {
    return Observable.combineLatest(
        Observable.merge(
            Observable.fromEvent(element.nativeElement, 'compositionstart').map(() => true),
            Observable.fromEvent(element.nativeElement, 'compositionend').map(() => false),
        ).startWith(false),
        Observable.fromEvent(element.nativeElement, 'keyup'),
    )
    .filter(array => !array[0])
    .map(array => array[1])
    .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
    .debounceTime(debounceTime)
    .distinctUntilChanged()
    .filter(value => value.length >= minLength);
}
