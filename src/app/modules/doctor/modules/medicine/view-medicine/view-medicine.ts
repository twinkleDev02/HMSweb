import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-medicines',
  standalone: false,
  templateUrl: './view-medicine.html',
  styleUrls: ['./view-medicine.scss'],
})
export class ViewMedicine implements OnInit {

  medicineList: any[] = [];
  filteredMedicines: any[] = [];
  paginatedMedicines: any[] = [];

  searchText = "";

  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;

  ngOnInit() {
    const saved = JSON.parse(localStorage.getItem("medicines") || "[]");
    this.medicineList = saved.map((m: any, i: number) => ({ ...m, id: i + 1 }));

    this.filteredMedicines = [...this.medicineList];
    this.applyPagination();
  }

  searchMedicines() {
    const s = this.searchText.toLowerCase();

    this.filteredMedicines = this.medicineList.filter(m =>
      m.medicineName.toLowerCase().includes(s) ||
      m.medicineType.toLowerCase().includes(s) ||
      (m.manufacturerName && m.manufacturerName.toLowerCase().includes(s))
    );

    this.pageNumber = 1;
    this.applyPagination();
  }

  applyPagination() {
    this.totalPages = Math.ceil(this.filteredMedicines.length / this.pageSize);

    const start = (this.pageNumber - 1) * this.pageSize;
    this.paginatedMedicines = this.filteredMedicines.slice(start, start + this.pageSize);
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
