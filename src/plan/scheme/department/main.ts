import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemeDepartmentComponent} from './department.component';
import {SchemeDepartmentRoutingModule} from './department.routes';
import {SchemeDepartmentService} from './department.service';
import {SchemeDepartmentItemModule} from './item/department-item.module';
import {SchemeDepartmentListModule} from './list/department-list.module';
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
        {provide: 'DEPARTMENT_SCHEMES_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes'},
        {provide: 'DEPARTMENT_DIRECTIONS_API_URL', useValue: '/api/plan/departments/${departmentId}/directions'},
        {provide: 'SCHEME_IMPORT_API_URL', useValue: '/api/plan/public/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
