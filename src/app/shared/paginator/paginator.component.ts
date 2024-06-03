import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  //this will come from parent component.
  @Input() totalPages: number; // 2

  currentPage: number = 1;
  @Output() sendCurrentPageNumber: EventEmitter<number> = new EventEmitter();
  pages: number[];

  constructor() {
  }

  ngOnChanges() {
    this.showPages()
  }

  onNext() {
    if (this.currentPage == this.totalPages) {
      return;
    } else {
      this.currentPage = this.currentPage + 1;
      this.showPages();
      this.sendCurrentPageNumber.emit(this.currentPage);
    }
  }

  onPrev() {
    if (this.currentPage == 1) {
      return;
    } else {
      this.currentPage = this.currentPage - 1;
      this.showPages();
      this.sendCurrentPageNumber.emit(this.currentPage);
    }
  }

  showNext(page: number) {
    this.currentPage = page;
    this.sendCurrentPageNumber.emit(this.currentPage);
  }

  showPages() {
    this.pages = [
      // this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      // this.currentPage + 2
    ].filter((pageNumber) => {
      return pageNumber > 0 && pageNumber <= this.totalPages
    })
  }
}
