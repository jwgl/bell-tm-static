import '@angular/common';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// tslint:disable-next-line:no-duplicate-imports
import {enableProdMode} from '@angular/core';

if ('production' === ENV) {
    // Production
    enableProdMode();
} else {
    // Development
}
