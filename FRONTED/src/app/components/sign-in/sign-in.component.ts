import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User.model';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  signInForm: FormGroup;
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      e_mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  checkUser() {
    let user = new User();
    let E_mail: string = this.signInForm.controls.e_mail.value;
    let passsword: string = this.signInForm.controls.password.value;
    this.userService.checkUser(E_mail, passsword, user).subscribe(
      res => { this.userService.setCurrentUser(res);
         console.log(res); 
        if (res != undefined)
         this.router.navigate(['/manageTheGMH'])
      },
    err => { console.log(err); }

    )
  }
}

