import {Title} from '@angular/platform-browser';
import {Component, ElementRef} from '@angular/core';
import {Scheme} from '../../common/scheme.model';
import '../../common/scheme-viewer.model';
import {SchemePublicService} from '../public.service';

/**
 * 教学计划（公共）。
 */
@Component({
    selector: 'public-scheme',
    template: require('./public-item.html'),
})
export class SchemePublicItemComponent {
    private vm: Scheme;

    constructor(
        private elementRef: ElementRef,
        private publicService: SchemePublicService,
        private title: Title) {
        // TODO: see https://github.com/angular/angular/issues/1858
        let id = elementRef.nativeElement.getAttribute('id');
        this.publicService.getItem(id).subscribe(scheme => {
            this.vm = scheme;
            this.vm.normalize();
            this.title.setTitle(`${this.vm.departmentName} - ${this.vm.title}`);
        });
    }
}
