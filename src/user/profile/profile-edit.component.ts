import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserProfileService} from './profile.service';

@Component({
    styleUrls: ['profile.component.scss'],
    templateUrl: 'profile-edit.component.html',
})
export class UserProfileEditComponent {
    user: any;
    private saving = false;

    constructor(
        private router: Router,
        private service: UserProfileService,
    ) {}

    ngOnInit() {
        this.service.loadList().subscribe(dto => {
            this.user = dto;
        });
    }

    save() {
        this.saving = true;
        this.service.updateUser({
            email: this.user.email,
            officePhone: this.user.officePhone,
            longPhone: this.user.longPhone,
            shortPhone: this.user.shortPhone,
        }).subscribe(() => {
            this.router.navigate(['/']);
        }, error => {
            this.saving = false;
            alert(error);
        });
    }
}
