import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../shared/services/toast-service';

@Component({
  selector: 'app-add-new-patient',
  standalone: false,
  templateUrl: './add-new-patient.html',
  styleUrls: ['./add-new-patient.scss']
})
export class AddNewPatient implements OnInit {

  patientForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastService);
  today: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      abhaId: ['']
    });
  }

  isInvalid(field: string) {
    const control = this.patientForm.get(field);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.patientForm.valid) {

      const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
      savedPatients.push(this.patientForm.value);
      localStorage.setItem("patients", JSON.stringify(savedPatients));

      this.toast.success("Patient Saved Successfully");
      this.patientForm.reset();

      this.router.navigate(['/doctor/patient/allpatient']);
    }
    else {
      this.patientForm.markAllAsTouched();
    }
  }
}
