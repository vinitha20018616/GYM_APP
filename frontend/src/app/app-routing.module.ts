import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BmiComponent } from './bmi/bmi.component';


const routes: Routes = [
  
  { path: '', component: LoginComponent },

  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'bmi', component: BmiComponent}
      
    ],
  },

  
  { path: 'register', component: RegisterComponent },

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
