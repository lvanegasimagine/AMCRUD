import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartamentsService } from '../../shared/departaments.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, public departmentsService: DepartamentsService,
              public notificationService: NotificationService, public dialogRef: MatDialogRef<EmployeeComponent>) { }
  ngOnInit(): void {
    this.employeeService.getEmployees();
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.employeeService.form.valid) {
      if (!this.employeeService.form.get('$key').value) {
        this.employeeService.insertEmployee(this.employeeService.form.value);
        this.employeeService.form.reset();
        this.onClose();
      }
      else
      {
        this.employeeService.updateEmployee(this.employeeService.form.value);
        this.employeeService.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.employeeService.form.reset();
        this.onClose();
      }
    }
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }
}
