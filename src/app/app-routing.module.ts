import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './core/layouts/main/main.component';
import { AuthenticationComponent } from './core/layouts/authentication/authentication.component';
import { SignupComponent } from './features/signup/signup.component';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
