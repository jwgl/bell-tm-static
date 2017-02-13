import {Component, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Vision} from '../../common/vision.model';
import {VisionPublicService} from '../public.service';

/**
 * 培养方案（公共）。
 */
@Component({
    selector: 'public-vision',
    templateUrl: 'public-item.component.html',

})
export class VisionPublicItemComponent {
    private vm: Vision;

    constructor(
        public elementRef: ElementRef,
        private service: VisionPublicService,
        private title: Title) {
        // TODO: see https://github.com/angular/angular/issues/1858
        const id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new Vision(dto);
            this.title.setTitle(`${this.vm.departmentName} - ${this.vm.title}`);
        });
    }
}
