import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  email = '';
  password = '';
  password2 = '';

  constructor(private activateRoute: ActivatedRoute, private authService: AuthService,
    private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      window.localStorage.setItem('token', params.token);
      this.email = this.getDecodedAccessToken(params.token).sub;
    })
    
  }

  save(): void {
    if (this.password != this.password2){
      this.notifyService.showMessage("As senhas são diferentes!", true);
      return;
    }

    const dto = {
      email: this.email,
      password: this.password
    }

    this.authService.updatePassword(dto);
  }

  cancel(): void {

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
  

}
