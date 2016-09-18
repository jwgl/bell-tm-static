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
        RestModule.for('/api/cardReissueOrders'),
        routing,
        ReissueOrderListModule,
        ReissueOrderItemModule,
        ReissueOrderEditorModule,
        ReissueOrderReceiveModule,
    ],
    providers: [
        ReissueOrderService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
