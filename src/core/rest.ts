import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Rest} from './rest/rest';
import {ApiUrl, API_URL, BASE_URL} from './rest/api-url';
import {ShowService} from './rest/show-service';
import {EditService} from './rest/edit-service';

export {
    Rest,
    ApiUrl,
    API_URL,
    BASE_URL,
    ShowService,
    EditService,
}

@NgModule({
    imports: [HttpModule],
    providers: [Rest],
})
export class RestModule {
    static for(apiUrl: string): ModuleWithProviders {
        return {
            ngModule: RestModule,
            providers: [{
                provide: ApiUrl,
                useFactory: () => new ApiUrl(apiUrl),
            }],
        };
    }
}
