import {Title} from '@angular/platform-browser';
import {Component, ElementRef} from '@angular/core';
import {Vision} from '../../common/vision.model';
import {VisionPublicService} from '../public.service';

/**
 * 培养方案（公共）。
 */
@Component({
    selector: 'public-vision',
    template: require('./public-item.html'),

})
export class VisionPublicItemComponent {
    private vm: Vision;

    constructor(
        public elementRef: ElementRef,
        private publicService: VisionPublicService,
        private title: Title) {
        // TODO: see https://github.com/angular/angular/issues/1858
        let id = elementRef.nativeElement.getAttribute('id');
        this.publicService.getItem(id).subscribe(vision => {
            this.vm = vision;
            this.title.setTitle(`${vision.departmentName} - ${vision.title}`);
        });
    }
}
