import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  success(message: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(message, '', this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
