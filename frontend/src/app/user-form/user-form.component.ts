import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private userForm: any;
  pressedPassword: boolean;
  private password: string;
  private password_check: string;
  private old_password: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router,
              private snackbar: MatSnackBar, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.userForm = this.fb.group({
      id: [null],
      username: [''],
      first_name: [''],
      last_name: [''],
      old_password: [''],
      password: [''],
      password_check: [''],
      email: [''],
      level: [1],
      score: [0],
      is_superuser: [false],
      is_staff: [false]
    }, {validator: this.passwordMatchValidator});
    if (data.user) {
      this.userForm.patchValue(data.user);
      this.userForm.patchValue({password: ''});
      this.userForm.controls.old_password.disable();
      this.userForm.controls.password.disable();
      this.userForm.controls.password_check.disable();
    }
  }

  onSubmit() {
    const user = this.userForm.value;
    if (user.id) {
      this.userService.updateUser(user).subscribe(() => {
        this.snackbar.open('Successfully Updated!', 'close', {duration: 1000});
        this.router.navigate(['/user-form/' + user.id]);
      });
    } else {
      this.userForm.patchValue({is_staff: this.userForm.value.is_superuser});
      this.userService.register(user).subscribe(() => {
        this.router.navigate(['/user-list']);
      });
    }
  }

  changePassword() {
    this.userForm.controls.old_password.enable();
    this.userForm.controls.password.enable();
    this.userForm.controls.password_check.enable();
    this.pressedPassword = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordChangeComponent, {
      width: '250px',
     data: {password: this.password, password_check: this.password_check, old_password: this.old_password}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userForm.patchValue(result);
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('password_check').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password_check').setErrors({pw_check: true});
    }
  }
}

export interface DialogData {
  password: string;
  password_check: string;
  old_password: string;
}

@Component({
  selector: 'app-password-change.component',
  templateUrl: 'password-change.component.html',
})
export class PasswordChangeComponent {

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
