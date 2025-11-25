import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-patients',
  standalone: false,
  templateUrl: './view-all-patients.html',
  styleUrl: './view-all-patients.scss',
})
export class ViewAllPatients {


  patientList: any[] = [];
  filteredPatients: any[] = [];  // After search
  paginatedPatients: any[] = []; // After pagination

  searchText = "";

  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;

  ngOnInit() {
    const saved = JSON.parse(localStorage.getItem("patients") || "[]");
    this.patientList = saved.map((p: any, i: number) => ({ ...p, id: i + 1 }));

    this.filteredPatients = [...this.patientList];
    this.applyPagination();
  }

  searchPatients() {
    const s = this.searchText.toLowerCase();

    this.filteredPatients = this.patientList.filter(p =>
      p.fullName.toLowerCase().includes(s) ||
      p.phoneNumber.includes(s) ||
      p.gender.toLowerCase().includes(s)
    );

    this.pageNumber = 1;
    this.applyPagination();
  }

  applyPagination() {
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);

    const start = (this.pageNumber - 1) * this.pageSize;
    this.paginatedPatients = this.filteredPatients.slice(start, start + this.pageSize);
  }

  goToPage(p: number) {
    this.pageNumber = p;
    this.applyPagination();
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.applyPagination();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.applyPagination();
    }
  }
}

