/*
 * app.component.ts Copyright (c) 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {ProfilePictureService} from './service/profile-picture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  isLoggedIn = false;
  user = null;

  constructor(private userService: UserService, private profilePictureService: ProfilePictureService) {
  }

  ngOnInit() {
    console.log('wurde aufgerufen');
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.user == null) {
      this.userService.getUser().subscribe((res) => {
        this.user = res;
      });
    }
  }
}
