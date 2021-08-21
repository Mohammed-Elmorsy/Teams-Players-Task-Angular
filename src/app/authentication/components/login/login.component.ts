import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ---------------------------------------------- constructor -----------------------------------------
  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      userName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: [null , [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    })
   }
  // ------------------------------------------------ fields ---------------------------------------------
  loginForm: FormGroup;
  get userName(): FormControl {
    return this.loginForm.get('userName') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  @ViewChild('loginBtn') loginBtn: ElementRef;
  // ------------------------------------------- life cycle hooks -----------------------------------------
  ngOnInit(): void {
  }
  // --------------------------------------------- methods ------------------------------------------------
  login() {
    this.disableLoginButtonTemporarily();
    this.auth.login(this.loginForm.value).subscribe( 
    result => {
      console.log('result', result);
      //alert('logined successfully');
      localStorage.setItem('token', result.token);
      this.router.navigate(['dashboard']);
    },
    error => {
      console.log('error', error);
      alert('login failed ! error from server');
    })
  }

  disableLoginButtonTemporarily() {
    this.loginBtn.nativeElement.disabled = true;
    //console.log('btn ', this.registerBtn); 
    setTimeout(() => {
      this.loginBtn.nativeElement.disabled = false;
    }, 5000);

  }

}
