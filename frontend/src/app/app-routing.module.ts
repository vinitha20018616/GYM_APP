import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BmiComponent } from './bmi/bmi.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WorkoutComponent } from './my-workouts/my-workouts.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TaskRoomComponent } from './task-room/task-room.component';
import { AuthGuard } from './auth.guard';  

const routes: Routes = [
  
  { path: '', component: LoginComponent },

  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  
      { path: 'bmi', component: BmiComponent, canActivate: [AuthGuard] },      
      { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] }, 
      { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard] }, 
      { path: 'my-workouts', component: WorkoutComponent, canActivate: [AuthGuard] }, 
      { path: 'task-room', component: TaskRoomComponent, canActivate: [AuthGuard] } 
    ]
  },

  
  { path: 'register', component: RegisterComponent },

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
