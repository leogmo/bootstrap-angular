import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/models/login.model';
import { Signup } from 'src/app/core/models/signup.model';
import { environment } from 'src/environments/environment';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router,
    private notifyService: NotifyService) { }

  login(login: Login): void {
    console.log(JSON.stringify(login));
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    this.httpClient.post(environment.api_base_url + '/user/login', JSON.stringify(login), httpOptions).subscribe(res => {
      window.localStorage.setItem('token', res['token']);
      this.router.navigate(['']);
    })
  }

  signup(signup: Signup): void {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    this.httpClient.post(environment.api_base_url + '/user/signup', JSON.stringify(signup), httpOptions).subscribe(res => {
      this.router.navigate(['login']);
    })
  }

  passRecover(email: string): void {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    this.httpClient.post(environment.api_base_url + '/user/passrecover', {"email": email}, httpOptions).subscribe(res => {
      this.notifyService.showMessage("Um email com o link para redefinir a senha foi enviado.")
      this.router.navigate(['login']);
    })
  }
}
