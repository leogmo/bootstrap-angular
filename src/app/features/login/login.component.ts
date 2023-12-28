import { NotifyService } from './../../shared/services/notify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router,
    private notifyService: NotifyService) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    try {
      this.authService.login(this.login);
    } catch (error){
      console.error(error);
    }
    
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  passRecover(): void {
    try {
      if (this.login.email == ''){
        this.notifyService.showMessage('Informe o email para recuperar a senha');
        return;
      }
      this.authService.passRecover(this.login.email);
    } catch (error){
      console.error(error);
    }
  }
}
