import { Component, inject, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{


  masterData: any[] = [];
  filteredData: any[] = [];
  today: string = '';
  private router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.today = this.getTodayDate();
    this.loadFullData();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.includes('dashboard')) {
        this.loadFullData();
      }
    });
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  loadFullData() {
    const today = this.today;
    
    const defaultData  = [
      { appointmentViewId: 101, patientName: "Ravi Kumar",appointmentDate: today, visitReason: "Fever", patientPhone: "9876543210", doctorName: "Dr. Sharma", createdDate: "2025-01-14", status: "Pending" },
      { appointmentViewId: 102, patientName: "Neha Sharma", appointmentDate: today, visitReason: "Headache", patientPhone: "9988776655", doctorName: "Dr. Sharma", createdDate: "2025-01-15", status: "Completed" },
      { appointmentViewId: 103, patientName: "Rahul Verma", appointmentDate: today, visitReason: "Checkup", patientPhone: "9123456780", doctorName: "Dr. Sharma", createdDate: "2025-01-16", status: "Pending" },
      { appointmentViewId: 104, patientName: "Simran", appointmentDate: today, visitReason: "Cold", patientPhone: "9865321470", doctorName: "Dr. Sharma", createdDate: "2025-01-17", status: "Cancelled" },
      { appointmentViewId: 105, patientName: "Aman Gupta", appointmentDate: today, visitReason: "Stomach Pain", patientPhone: "9456123780", doctorName: "Dr. Sharma", createdDate: "2025-01-18", status: "Pending" },
      { appointmentViewId: 106, patientName: "Priya Singh", appointmentDate: today, visitReason: "Migraine", patientPhone: "9651234789", doctorName: "Dr. Sharma", createdDate: "2025-01-19", status: "Completed" },
      { appointmentViewId: 107, patientName: "Raja Kumar", appointmentDate: today, visitReason: "Fever", patientPhone: "9876543210", doctorName: "Dr. Sharma", createdDate: "2025-01-20", status: "Pending" },
      { appointmentViewId: 108, patientName: "Pooja Sharma", appointmentDate: today, visitReason: "Headache", patientPhone: "9090776655", doctorName: "Dr. Sharma", createdDate: "2025-01-09", status: "Completed" },
      { appointmentViewId: 109, patientName: "Amit Verma", appointmentDate: today, visitReason: "Checkup", patientPhone: "9999456780", doctorName: "Dr. Sharma", createdDate: "2025-01-22", status: "Pending" },
      { appointmentViewId: 110, patientName: "Shiru", appointmentDate: today, visitReason: "Cold", patientPhone: "9865000070", doctorName: "Dr. Sharma", createdDate: "2025-01-24", status: "Pending" },
      { appointmentViewId: 111, patientName: "Seema Gupta", appointmentDate: today, visitReason: "Stomach Pain", patientPhone: "9400123780", doctorName: "Dr. Sharma", createdDate: "2025-01-25", status: "Completed" },
      { appointmentViewId: 112, patientName: "Divya Singh", appointmentDate: today, visitReason: "Migraine", patientPhone: "9653334789", doctorName: "Dr. Sharma", createdDate: "2025-01-23", status: "Completed" }
    ];

    const savedData = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.masterData = [...defaultData, ...savedData].filter(a => a.appointmentDate === today);

    this.filteredData = this.masterData;
  }

  get totalAppointments() {
    return this.masterData.length;
  }

  get pendingAppointments() {
    return this.masterData.filter(a => a.status === 'Pending').length;
  }

  get completedAppointments() {
    return this.masterData.filter(a => a.status === 'Completed').length;
  }

  get cancelledAppointments() {
    return this.masterData.filter(a => a.status === 'Cancelled').length;
  }

  // Example revenue calculation
  get revenue() {
    return this.masterData.filter(a => a.status === 'Completed').length * 500; // assuming ₹500 per appointment
  }
}
