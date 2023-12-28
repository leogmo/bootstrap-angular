
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from 'src/app/core/models/signup.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: Signup = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  doSignup(): void {
    try {
      this.authService.signup(this.signup);
    } catch (error){
      console.error(error);
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }

}
