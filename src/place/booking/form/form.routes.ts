import {RouterModule} from '@angular/router';

import {EditMode} from 'core/constants';

import {BookingFormListComponent} from './list/form-list.component';
import {BookingFormItemComponent} from './item/form-item.component';
import {BookingFormEditorComponent} from './editor/form-editor.component';

const ROUTER_CONFIG = [
    {path: '', component: BookingFormListComponent},
    {path: 'create', component: BookingFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: BookingFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: BookingFormItemComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
