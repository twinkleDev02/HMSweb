
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../../shared/services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medicine',
  standalone: false,
  templateUrl: './add-medicine.html',
  styleUrls: ['./add-medicine.scss']
})
export class AddMedicine implements OnInit {

  medicineForm!: FormGroup;
  private router = inject(Router);
  private toast = inject(ToastService);
  private fb =  inject(FormBuilder);
  constructor() {}

  ngOnInit() {
    this.medicineForm = this.fb.group({
      medicineType: ['', Validators.required],
      medicineName: ['', Validators.required],
      manufacturerName: [''],
      quantity: ['']
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.medicineForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.medicineForm.valid) {
      console.log('Medicine Data:', this.medicineForm.value);
      const savedmedicine = JSON.parse(localStorage.getItem("medicines") || "[]");
      savedmedicine.push(this.medicineForm.value);
      localStorage.setItem("medicines", JSON.stringify(savedmedicine));

      this.toast.success("Medicine Saved Successfully");
      this.medicineForm.reset();

      this.router.navigate(['/doctor/medicine/allmedicine']);
    } else {
      this.medicineForm.markAllAsTouched();
    }
  }
}

