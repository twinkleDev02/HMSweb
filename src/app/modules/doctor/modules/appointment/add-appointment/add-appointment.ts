import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  standalone : false,
  templateUrl: './add-appointment.html',
  styleUrls: ['./add-appointment.scss']
})
export class AddAppointment implements OnInit {

  addAppointmentForm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  todayDate: string = new Date().toISOString().split('T')[0];
  TodayDateTime: string = new Date().toISOString().slice(0, 16);

  doctorList = [
    { userId: 3, fullName: 'Dr. Sharma' }
  ];
  constructor() { }

  ngOnInit(): void {
    this.addAppointmentForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: [''],
      dob: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      weight: [''],
      height: [''],
      pulse: [''],
      oxygen: [''],
      referDoctor: [''],
      abhaId: [''],
      appointmentDate: ['', Validators.required],
      doctor: ['', Validators.required],
      appointmentFee: [''],
      visitReason: ['']
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.addAppointmentForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.addAppointmentForm.invalid) {
      this.addAppointmentForm.markAllAsTouched();
      return;
    }

    const formData = this.addAppointmentForm.value;

    const newAppointment = {
      appointmentViewId: Math.floor(Math.random() * 1000) + 200, 
      patientName: formData.fullName,
      doctorName: this.doctorList.find(d => d.userId == formData.doctor)?.fullName || '',
      appointmentDate: formData.appointmentDate,
      visitReason: formData.visitReason || '',
      patientPhone: formData.phoneNumber,
      createdDate: new Date().toISOString(),
      status: 'Pending',
    };

    let existingData = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingData.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(existingData));
    this.router.navigate(['/doctor/appointment/todayappointments']);
  }

}
