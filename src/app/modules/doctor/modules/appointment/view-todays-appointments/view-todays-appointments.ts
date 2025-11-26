import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-view-todays-appointments',
  standalone: false,
  templateUrl: './view-todays-appointments.html',
  styleUrl: './view-todays-appointments.scss',
})
export class ViewTodaysAppointments implements OnInit {
 
  masterData: any[] = [];
  dataList: any[] = [];
  filteredData: any[] = [];
  searchText: string = "";
 
  pageNumber = 1;
  pageSize = 5;
  totalCount = 0;
  totalPages = 0;
 
  activeTab: string = "All";  
 
  ngOnInit(): void {
    this.loadFullData();
    this.applyFilter("All");
  }
 
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
 
  loadFullData() {
    const today = this.getTodayDate();
 
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
 
      this.masterData = [...defaultData, ...savedData];
 
      this.masterData = this.masterData.filter(app => {
        return app.appointmentDate.split('T')[0] === today;
      });
  }  
 
  applyFilter(tab: string) {
    this.activeTab = tab;
    this.pageNumber = 1;
 
    if (tab === "Upcoming") {
      this.filteredData = this.masterData.filter(x => x.status === "Pending");
    } else if (tab === "Completed") {
      this.filteredData = this.masterData.filter(x => x.status === "Completed");
    } else if (tab === "Cancelled") {
      this.filteredData = this.masterData.filter(x => x.status === "Cancelled");
    } else {
      this.filteredData = this.masterData;
    }
 
    // Step 2: Apply search filter
    if (this.searchText && this.searchText.trim() !== "") {
      const s = this.searchText.toLowerCase();
 
      this.filteredData = this.filteredData.filter(x =>
        x.patientName.toLowerCase().includes(s) ||
        x.doctorName.toLowerCase().includes(s) ||
        x.patientPhone.includes(s) ||
        x.visitReason.toLowerCase().includes(s)
      );
    }
 
    this.totalCount = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
 
    this.paginate();
 
  }
    paginate() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    this.dataList = this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }
 
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.paginate();
  }
 
  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.paginate();
    }
  }
 
  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.paginate();
    }
  }
 
  formatDate(date: string) {
    return new Date(date).toDateString();
  }
 
  get upcomingCount() {
    return this.masterData.filter(x => x.status === "Pending").length;
  }
 
  get cancelledCount() {
    return this.masterData.filter(x => x.status === "Cancelled").length;
  }
 
  get completedCount() {
    return this.masterData.filter(x => x.status === "Completed").length;
  }
}