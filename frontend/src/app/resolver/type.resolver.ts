/*
 * type.resolver.ts Copyright (c) 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {TypeService} from '../service/type.service';

@Injectable({
  providedIn: 'root'
})
export class TypeResolver implements Resolve<Observable<any>> {

  constructor(private typeService: TypeService) {
  }

  resolve() {
    return this.typeService.getAll();
  }
}
