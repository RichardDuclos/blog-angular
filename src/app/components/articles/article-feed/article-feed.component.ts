import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Article} from "../../../models/article.model";
import {ArticleService} from "../../../services/article/article.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
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
  subscription: Subscription | undefined;
  page: number = 1;
  limit: number = 10;
  totalArticles: number = 0;
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
    this.subscription = this.articleService.getAll(this.limit,this.page).subscribe(
      (data: HttpResponse<Article[]>) => {
        const count = data.headers.get('X-Total-Count');
        if(count) {
          this.totalArticles = +count;
        }
        let articles: Article[] = [];
        if(data.body !== null) {
          articles = data.body;
        }
        this.articles = articles;
      },
      (error) =>  {
        console.log('Api call error')
      }
    )
  }

  handlePageEvent($e: PageEvent) {
    this.limit = $e.pageSize;
    this.page = $e.pageIndex + 1;
    this.fetchArticles()
  }
}
