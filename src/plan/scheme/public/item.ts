import {bootstrap} from '@angular/platform-browser-dynamic';
import {Title} from '@angular/platform-browser';
import {provide, Component, ElementRef, OnInit} from '@angular/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {SchemeViewerComponent} from '../common/scheme-viewer.component';
import {SchemePublicService} from './public.service';
import {Scheme} from '../common/scheme.model';
import '../common/scheme-viewer.model';

/**
 * 教学计划（公共）。
 */
@Component({
    selector: 'public-scheme',
    template: require('./item.html'),
    directives: [SchemeViewerComponent],
})
class SchemePublicItemComponent implements OnInit {
    private vm: Scheme;
    private id: string;

    constructor(
        private elementRef: ElementRef,
        private publicService: SchemePublicService,
        private title: Title) {
        // TODO: see https://github.com/angular/angular/issues/1858
        this.id = elementRef.nativeElement.getAttribute('id');
    }

    ngOnInit() {
        this.publicService.getItem(this.id).subscribe(scheme => {
            this.vm = scheme;
            this.vm.normalize();
            this.title.setTitle(this.vm.title);
        });
    }
}

bootstrap(SchemePublicItemComponent, [
    provide(API_URL, {useValue: '/api/schemes'}),
    REST_PROVIDERS,
    SchemePublicService,
    Title,
]);
