import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // ------------------------------------------- constructor -----------------------------------------------
  constructor(fb: FormBuilder, private auth: AuthService) {
    this.registerForm = fb.group({
      userName : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password : [null , [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      firstName: [''],
      lastName : [''],
      email    : ['' , [Validators.required, Validators.email]],
      role     : [1]
    });
   }
  // --------------------------------------------- fields --------------------------------------------------
  registerForm: FormGroup;
  get userName(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  @ViewChild('registerBtn') registerBtn: ElementRef;
  // ------------------------------------------- life cycle hooks -----------------------------------------
  ngOnInit(): void {
  }
  // --------------------------------------------- methods ------------------------------------------------
  register() {
    this.disableRegisterButtonTemporarily();
    this.auth.register(this.registerForm.value).subscribe( 
    result => {
      console.log('result', result);
      alert('registered successfully');
    },
    error => {
      console.log('error', error);
      alert('registeration failed ! ' + error.error);
    })
  }

  disableRegisterButtonTemporarily() {
    this.registerBtn.nativeElement.disabled = true;
    //console.log('btn ', this.registerBtn); 
    setTimeout(() => {
      this.registerBtn.nativeElement.disabled = false;
    }, 5000);

  }

}
