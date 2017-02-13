import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {API_URL, ApiUrl, BASE_URL} from './rest/api-url';
import {EditService} from './rest/edit-service';
import {Rest} from './rest/rest';
import {ReviewService} from './rest/review-service';
import {ShowService} from './rest/show-service';

export {
    Rest,
    ApiUrl,
    API_URL,
    BASE_URL,
    ShowService,
    EditService,
    ReviewService,
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
