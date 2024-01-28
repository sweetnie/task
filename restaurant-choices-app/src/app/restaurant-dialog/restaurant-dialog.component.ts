import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-dialog',
  templateUrl: './restaurant-dialog.component.html',
  styleUrls: ['./restaurant-dialog.component.css'],
})
export class RestaurantDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
