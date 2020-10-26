import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartamentsService } from '../../shared/departaments.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'city', 'departmentName', 'mobile', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private employeeService: EmployeeService, public departmentsService: DepartamentsService, private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          let departmentName = this.departmentsService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.employeeService.deleteEmployee($key);
    this.notificationService.warn('! Deleted successfully');
    }
  }
}
