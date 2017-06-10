import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemeDepartmentItemModule} from './item/department-item.module';
import {SchemeDepartmentListModule} from './list/department-list.module';
import {SchemeDepartmentComponent} from './main.component';
import {SchemeDepartmentRoutingModule} from './main.routing';
import {SchemeDepartmentService} from './main.service';
import {SchemeDepartmentToesModule} from './toes/department-toes.module';

@NgModule({
    bootstrap: [SchemeDepartmentComponent],
    declarations: [
        SchemeDepartmentComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/departments/${departmentId}/schemes'),
        SchemeDepartmentRoutingModule,
        SchemeDepartmentListModule,
        SchemeDepartmentItemModule,
        SchemeDepartmentToesModule,
    ],
    providers: [
        SchemeDepartmentService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
