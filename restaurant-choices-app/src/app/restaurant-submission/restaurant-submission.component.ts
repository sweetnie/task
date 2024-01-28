import { Component } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantDialogComponent } from '../restaurant-dialog/restaurant-dialog.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors,  ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-submission',
  templateUrl: './restaurant-submission.component.html',
  styleUrls: ['./restaurant-submission.component.css']
})
export class RestaurantSubmissionComponent {

  form: FormGroup;
  isSubmitted: Boolean = false;

  constructor (
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, this.validateRestaurantNameFormat()]]
    });
  }

  get name() {
    return this.form.controls['name'];
  }

  submitRestaurant(): void {
    this.isSubmitted = true;

    if (this.name.invalid) {
      return;
    }

    if (this.form.valid) {
      const formData = this.form.value;

      this.restaurantService.submitRestaurant(formData.name).subscribe(
        response => {
          this.form.reset();
          this.openDialog(response.name);
        },
        error => {
          console.error(error);

          if (error.status === 400) {
            alert('Invalid input. Please check the restaurant name.');
          } else if (error.status === 500) {
            alert('An internal server error occurred. Please try again later.');
          } else {
            alert('Something went wrong. Please try again.');
          }
        }
      );
    }
  }

  openDialog(restaurantName: string): void {
    this.dialog.open(RestaurantDialogComponent, {
      width: '300px',
      data: { name: restaurantName },
    });
  }

  validateRestaurantNameFormat(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      // custom validation for pattern /^[\w\s]+ - [\w\s]+$/
      const validFormat = /^[\w\s]+ - [\w\s]+$/;
      const isValid = validFormat.test(control.value);

      if (!control.value) {
          return null;
      }

      return !isValid ? {invalidFormat:true}: null;
    }
  }
}
