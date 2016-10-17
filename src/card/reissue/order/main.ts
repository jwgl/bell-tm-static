import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {ReissueOrderComponent} from './order.component';
import {ReissueOrderService} from './order.service';
import {routing} from './order.routes';
import {ReissueOrderListModule} from './list/order-list.module';
import {ReissueOrderItemModule} from './item/order-item.module';
import {ReissueOrderEditorModule} from './editor/order-editor.module';
import {ReissueOrderReceiveModule} from './receive/order-receive.module';

@NgModule({
    bootstrap: [ReissueOrderComponent],
    declarations: [
        ReissueOrderComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/card/reissueOrders'),
        routing,
        ReissueOrderListModule,
        ReissueOrderItemModule,
        ReissueOrderEditorModule,
        ReissueOrderReceiveModule,
    ],
    providers: [
        ReissueOrderService,
        {provide: 'REISSUE_FORM_WEB_URL', useValue: '/web/card/reissueForms'},
        {provide: 'REISSUE_FORM_API_URL', useValue: '/api/card/reissueForms'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
