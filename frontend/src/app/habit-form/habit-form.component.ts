/*
 * habit-form.component.ts Copyright (c) 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {HabitService} from '../service/habit.service';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.scss']
})
export class HabitFormComponent implements OnInit {

  habitForm;
  memberOptions;
  typeOptions;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private habitService: HabitService, private router: Router,
              private snackbar: MatSnackBar, private userService: UserService) {
  }

  ngOnInit(): void {
    const userID = this.userService.getID();
    const data = this.route.snapshot.data;
    this.memberOptions = data.memberOptions;
    this.typeOptions = data.typeOptions;
    this.habitForm = this.fb.group({
      id: [null],
      start_date: [moment().startOf('day'), [Validators.required, this.startDateValidator()]],
      end_date: [null, Validators.required],
      name: ['', Validators.required],
      member: [userID, Validators.required],
      type: [null, Validators.required],
      priority: [1, Validators.required]
    }, {validator: this.dateValidator});
    if (data.habit) {
      this.habitForm.patchValue(data.habit);
    }
  }

  dateValidator(control: AbstractControl) {
    const startDate = moment(control.get('start_date').value);
    const endDate = moment(control.get('end_date').value);
    if (startDate.startOf('day').isSameOrAfter(endDate.endOf('day'))) {
      control.get('end_date').setErrors({date_check: true});
    }
  }

  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = moment(control.value).startOf('day');
      const today = moment().startOf('day');
      return startDate.isBefore(today) ? {start_check: {value: control.value}} : null;
    };
  }


  onSubmit() {
    const habit = this.habitForm.value;
    if (habit.id) {
      this.habitService.updateHabit(habit).subscribe(() => {
        this.snackbar.open('Successfully Updated!', 'close', {duration: 1000});
        this.router.navigate(['/habit-form/' + habit.id]);
      });
    } else {
      this.habitService.saveHabit(habit).subscribe((response: any) => {
        this.router.navigate(['/habit-form/' + response.id]);
      });
    }
  }

}
