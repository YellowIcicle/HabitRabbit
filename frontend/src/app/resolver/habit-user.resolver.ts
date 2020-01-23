/*
 * habit.resolver.ts Copyright (c) 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {HabitService} from '../service/habit.service';
import * as moment from 'moment';
import {UserService} from '../service/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitUserResolver implements Resolve<Observable<any>> {
  ID: number;
  habits: any[];

  constructor(private habitService: HabitService, private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(this.ID);
    this.userService.getUser().subscribe((res: any) => {
        this.ID = res.id;
      }
    );
    return this.habitService.getAll().pipe(map((res: any[]) => {
      this.habits = res.filter(e => {
        return e.member_id === this.ID ? e : null;
      });
      return this.populateInfo(this.habits);
    }));
  }

  populateInfo(habit: any[]): any[] {
    return habit.map((x) => {
      const start = moment(x.start_date).startOf('day');
      const end = moment(x.end_date).startOf('day');
      const today = moment().startOf('day');
      const duration = end.diff(start, 'day');
      const percentage = (x.clicked / duration * 100);
      x.late = moment().endOf('day').isAfter(moment(x.last_click).add(x.interval + 3, 'day'));
      x.clicked = x.late ? x.clicked - 1 : x.clicked;
      x.percentage = percentage < 0 || percentage > 100 ? '0' : percentage.toFixed(0);
      x.duration = duration < 0 ? duration * -1 : duration;
      x.failed = x.is_finished && x.percentage <= 50;
      if (moment().startOf('day').isSameOrAfter(end.endOf('day'))) {
        x.is_finished = true;
        x.today = true;
        x.left = 0;
        return x;
      } else {
        x.today = today.isSameOrAfter(start) ? moment(x.last_click).add(x.interval - 1, 'day').startOf('day')
          .isSameOrAfter(today) : true;
        const left = end.diff(today, 'day');
        x.left = left < 0 ? left * -1 : left;
        return x;
      }
    });
  }
}
