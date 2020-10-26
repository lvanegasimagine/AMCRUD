import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartamentsService {

  departmentList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.getDepartment();
  }

  getDepartment() {
    this.departmentList = this.firebase.list('departments');
    return this.departmentList.snapshotChanges().subscribe(resp => {
      this.array = resp.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      console.log(this.array);
    });
  }

  getDepartmentName($key) {
    if ($key === '0') {
      return '';
    }
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }

}
