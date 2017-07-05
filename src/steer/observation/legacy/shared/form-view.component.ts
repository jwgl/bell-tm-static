import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LegacyService } from '../legacy.service';

@Component({
    selector: 'legacy-form-view',
    templateUrl: 'form-view.component.html',
})
export class FormViewComponent {
    @Input() vm: any;
}
