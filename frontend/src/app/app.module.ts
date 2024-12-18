import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component'; 
import { HomeComponent } from './home/home.component'; 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BmiComponent } from './bmi/bmi.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TaskRoomComponent } from './task-room/task-room.component';
import { WorkoutComponent } from './my-workouts/my-workouts.component';


@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,          
    LoginComponent,       
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BmiComponent,
    AboutUsComponent,
    ContactUsComponent,
    TaskRoomComponent,
    WorkoutComponent
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
