import { Component } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrl: './na-article-list.component.css'
})
export class NaArticleListComponent {

  articles: Article[] = []
  totalPages: number = 2;
  category: string = 'sports'

  constructor(private newsSvc: NewsApiService) {

    this.newsSvc.pageOutput.subscribe((res) => {

      this.articles = res;
    });
    this.newsSvc.getPage(1);
    this.newsSvc.noOfPages.subscribe((res) => {
      this.totalPages = res;
    },
      (errr) => {
        console.log(errr);

      })
  }

  currentPage(pageNumber: number) {
    console.log(pageNumber);
    this.newsSvc.getPage(pageNumber);
  }

  getCategory(category: string) {
    this.category = category;
    this.newsSvc.getCategory(category)
  }

}
