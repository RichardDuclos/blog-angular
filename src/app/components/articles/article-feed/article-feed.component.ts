import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Article} from "../../../models/article.model";
import {ArticleService} from "../../../services/article/article.service";
import {Router} from "@angular/router";
import {delay, Subscription} from "rxjs";
import { User } from 'src/app/models/user.model';
import {HttpResponse} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.scss']
})
export class ArticleFeedComponent  implements OnInit, OnDestroy {
  articles: Article[] = [];
  @Input() user?: User;
  @Input() aboutUser?: User;
  subscription: Subscription | undefined;
  page: number = 0;
  limit: number = 10;
  totalArticles: number = 0;
  pageReady: boolean = false;
  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    if(!this.user) {
      throw new Error('user must be included')
    }
    this.fetchArticles()
  }
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  fetchArticles() {
    this.pageReady = false;
    if(!this.aboutUser) {
      this.subscription = this.articleService.getAll(this.limit,this.page + 1)
        .subscribe(
          (data: HttpResponse<Article[]>) => this.handleResponse(data)
        )
    } else {
      this.subscription = this.articleService.getAll(this.limit,this.page + 1, this.aboutUser.id)
        .subscribe(
          (data: HttpResponse<Article[]>) => this.handleResponse(data)
        )
    }
  }

  handleResponse(data: HttpResponse<Article[]>)  {
    console.log('yoo')
    const count = data.headers.get('X-Total-Count');
    if(count) {
      this.totalArticles = +count;
    }
    let articles: Article[] = [];
    if(data.body !== null) {
      articles = data.body;
    }
    this.articles = articles;
    console.log(this.articles)
    this.pageReady = true;
  }
  handlePageEvent($e: PageEvent) {
    this.limit = $e.pageSize;
    this.page = $e.pageIndex;
    this.fetchArticles()
  }
}
