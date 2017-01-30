import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {ReissueOrderComponent} from './order.component';
import {ReissueOrderService} from './order.service';
import {ReissueOrderRoutingModule} from './order.routing';
import {ReissueOrderListModule} from './list/order-list.module';
import {ReissueOrderItemModule} from './item/order-item.module';
import {ReissueOrderEditorModule} from './editor/order-editor.module';
import {ReissueOrderReceiveModule} from './receive/order-receive.module';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/card/reissueOrders'),
        ReissueOrderRoutingModule,
        ReissueOrderListModule,
        ReissueOrderItemModule,
        ReissueOrderEditorModule,
        ReissueOrderReceiveModule,
    ],
    declarations: [
        ReissueOrderComponent,
    ],
    providers: [
        ReissueOrderService,
        {provide: 'REISSUES_WEB_URL', useValue: '/web/card/reissues'},
        {provide: 'REISSUES_API_URL', useValue: '/api/card/reissues'},
    ],
    bootstrap: [ReissueOrderComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
