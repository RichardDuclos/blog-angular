import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Article} from "../../../models/article.model";
import {ArticleService} from "../../../services/article/article.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.scss']
})
export class ArticleFeedComponent  implements OnInit, OnDestroy {
  articles: Article[] = [];
  @Input() user?: User;
  subscription: Subscription | undefined;
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
    this.subscription = this.articleService.getAll().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error) =>  {
        console.log('Api call error')
      }
    )
  }
}
