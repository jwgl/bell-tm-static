import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {UserProfileEditComponent} from './profile-edit.component';
import {UserProfileViewComponent} from './profile-view.component';
import {UserProfileComponent} from './profile.component';
import {UserProfileRoutingModule} from './profile.routing.ts';
import {UserProfileService} from './profile.service';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/core/users/${userId}/profile'),
        FormsModule,
        CommonDirectivesModule,
        UserProfileRoutingModule,
    ],
    declarations: [
        UserProfileEditComponent,
        UserProfileViewComponent,
        UserProfileComponent,
    ],
    providers: [
        UserProfileService,
    ],
    bootstrap: [UserProfileComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
