import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-labtest',
  standalone: false,
  templateUrl: './view-labtest.html',
  styleUrl: './view-labtest.scss',
})
export class ViewLabtest implements OnInit {

  labtestList: any[] = [];
  filteredLabtest: any[] = [];
  paginatedLabtest: any[] = [];

  searchText = "";

  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;

  ngOnInit() {
    const saved = JSON.parse(localStorage.getItem("labtests") || "[]");
    this.labtestList = saved.map((m: any, i: number) => ({ ...m, id: i + 1 }));

    this.filteredLabtest = [...this.labtestList];
    this.applyPagination();
  }

  searchLabtests() {
    const s = this.searchText.toLowerCase();

    this.filteredLabtest = this.labtestList.filter(l =>
      l.labtestName.toLowerCase().includes(s) ||
      l.categoryType.toLowerCase().includes(s)
    );

    this.pageNumber = 1;
    this.applyPagination();
  }

  applyPagination() {
    this.totalPages = Math.ceil(this.filteredLabtest.length / this.pageSize);

    const start = (this.pageNumber - 1) * this.pageSize;
    this.paginatedLabtest = this.filteredLabtest.slice(start, start + this.pageSize);
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

