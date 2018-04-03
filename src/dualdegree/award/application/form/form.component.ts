import {Component} from '@angular/core';

import {ApplicationFormService} from './form.service';

@Component({
    selector: 'application-view',
    template: '<router-outlet></router-outlet>',
})
export class ApplicationViewComponent {
    constructor(service: ApplicationFormService) {
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        service.xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }
}
