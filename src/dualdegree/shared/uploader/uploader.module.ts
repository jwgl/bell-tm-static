import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgUploaderModule} from 'ngx-uploader';

import {UploaderPanelComponent} from './uploader.component';

@NgModule({
  imports: [
    BrowserModule,
    NgUploaderModule,
  ],
  declarations: [UploaderPanelComponent],
  exports: [UploaderPanelComponent],
})
export class UploaderModule {}
