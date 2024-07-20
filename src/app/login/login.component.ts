import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private authService:AuthService,
    private router:Router){

    }

    ngOnInit():void{
      this.loginForm = this.fb.group({
        email:[null,Validators.required],
        password:[null,Validators.required]
      })
    }

    togglePasswordVisibility(){
      this.hidePassword = !this.hidePassword;
    }

    onSubmit(){
      const username = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(username,password).subscribe(
        (res)=>{
          this.snackbar.open('Login Successful','Ok',{duration:5000});
        },
        (error)=>{
          this.snackbar.open('BAD Credentials','ERROR',{duration:5000});
        }
      )
    }
}
