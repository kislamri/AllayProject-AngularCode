import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './patient.service';
import  { AppointmentService } from './appointment.service';
import { NewPatientFormComponent } from './new-patient-form/new-patient-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { SicknessFormComponent } from './sickness-form/sickness-form.component';
import { ListSicknessComponent } from './list-sickness/list-sickness.component';
import { SicknessService } from './sickness.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { DoctorService } from './doctor.service'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


const appRoutes : Routes = [
  {path : '', redirectTo: 'patient' , pathMatch: 'full'},

  {path: 'new-patient-form', component:NewPatientFormComponent},
  {path: 'appointment-form', component:AppointmentFormComponent},
  {path: 'doctor-form', component:DoctorFormComponent},
  {path: 'sickness-form', component:SicknessFormComponent},



{path: '',  //default component to display
  component: ListPatientsComponent
}, 

{
  path: 'addPatient',  //when patients added 
  component: NewPatientFormComponent
},
{
  path: 'listPatients',  //when patients listed
  component: ListPatientsComponent
}, 
{
  path: 'editPatient/:_id', //when patients edited 
  component: NewPatientFormComponent 
},
{
  path: 'appointmentform', //when appoinement added

  component: AppointmentFormComponent
},
{
  path:'listAppointments',
  component: ListAppointmentsComponent
},

{
  path: 'editAppointment/:_id',
  component: AppointmentFormComponent
},

{
  path: 'sicknessform', //when sickness added

  component: SicknessFormComponent
},

{
  path:'listSickness',
  component: ListSicknessComponent
},
     
{
  path: 'editSickness/:_id',
  component: SicknessFormComponent
},


{
  path: 'doctorform',
  component: DoctorFormComponent
},

{
  path: 'listDoctor',
  component: ListDoctorComponent
},

{
  path: 'editDoctor/:_id',
  component: DoctorFormComponent
},

 {
  path: '**',  //when path cannot be found
  component: NotFoundComponent
}

  ];


  const firebaseConfig = {
    
    apiKey: "AIzaSyDYUv08JNQQaQPCeMRbGS7vZbPAyD9W75Q",

    authDomain: "ng-patient.firebaseapp.com",

    databaseURL: "https://ng-patient-default-rtdb.firebaseio.com",

    projectId: "ng-patient",

    storageBucket: "ng-patient.appspot.com",

    messagingSenderId: "978790743040",

    appId: "1:978790743040:web:b0fa4e56cd7dc4e9576ce5",

    measurementId: "G-1VS4JKJ8MG"
    
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPatientFormComponent,
    NavigationMenuComponent,
    ListPatientsComponent,
    AppointmentFormComponent,
    ListAppointmentsComponent,
    SicknessFormComponent,
    ListSicknessComponent,
    DoctorFormComponent,
    ListDoctorComponent,
    NotFoundComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    
  ],
  providers: [
    PatientService,
    AppointmentService,
    SicknessService,
    DoctorService


    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
