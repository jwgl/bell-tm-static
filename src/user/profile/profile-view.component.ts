import {Component, OnInit} from '@angular/core';

import {UserProfileService} from './profile.service';

@Component({
    styleUrls: ['profile.component.scss'],
    templateUrl: 'profile-view.component.html',
})
export class UserProfileViewComponent implements OnInit {
    user: any;

    constructor(private service: UserProfileService) {}

    ngOnInit() {
        this.service.loadList().subscribe(dto => {
            this.user = dto;
        });
    }
}
