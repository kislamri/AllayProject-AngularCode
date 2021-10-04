import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPatientFormComponent } from './new-patient-form/new-patient-form.component'
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { SicknessFormComponent } from './sickness-form/sickness-form.component';
import { ListSicknessComponent } from './list-sickness/list-sickness.component';
import { SicknessService } from './sickness.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { DoctorService } from './doctor.service';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  {path: 'new-patient-form', component:NewPatientFormComponent},
  {path: 'appointment-form', component:AppointmentFormComponent},
  {path: 'doctor-form', component:DoctorFormComponent},
  {path: 'sickness-form', component:SicknessFormComponent},



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
