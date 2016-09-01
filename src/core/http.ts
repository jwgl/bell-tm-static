import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Rest} from './http/rest';
import {ApiUrl, API_URL, BASE_URL} from './http/api-url';
import {EditService} from './http/edit-service';

export {
    Rest,
    ApiUrl,
    API_URL,
    BASE_URL,
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
