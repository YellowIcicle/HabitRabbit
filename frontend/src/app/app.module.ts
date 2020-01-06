import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { FaqComponent } from './faq/faq.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { HabitListComponent } from './habit-list/habit-list.component';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProfilePictureListComponent } from './profile-picture-list/profile-picture-list.component';
import { ProfilePictureFormComponent } from './profile-picture-form/profile-picture-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ProfilePageComponent,
    ScoreListComponent,
    FaqComponent,
    NavbarComponent,
    HabitFormComponent,
    ProfileFormComponent,
    DashboardComponent,
    UserListComponent,
    HabitListComponent,
    TypeListComponent,
    TypeFormComponent,
    MessageListComponent,
    MessageFormComponent,
    ProfilePictureListComponent,
    ProfilePictureFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
