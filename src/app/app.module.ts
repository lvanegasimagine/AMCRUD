import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './employees/employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent]
})
export class AppModule { }
