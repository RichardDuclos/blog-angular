import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../models/article.model";
import {ArticleService} from "../../services/article/article.service";
import {delay, map, Observable, Subscription} from "rxjs";
import {Comment} from "../../models/comment.model";
import {User} from "../../models/user.model";
import {SecurityService} from "../../services/security/security.service";
import {CommentService} from "../../services/comment/comment.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements  OnInit, OnDestroy{
  article: Article | undefined;
  comments: Comment[] = [];
  subscription: Subscription | undefined;
  user?: User;
  limit: number = 5;
  totalComments = 0;
  pageReady: boolean = false;
  constructor(
    private route: ActivatedRoute, private articleService: ArticleService, private securityService: SecurityService,
    private commentService: CommentService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.securityService.getLocalUser();
    if(!this.user) {
      this.securityService.logout();
    }
    const id = this.route.snapshot.params.id;
    this.articleService.get(id).subscribe(
      (article: Article) => {
        this.article = article
        this.fetchComments();

      }
    )
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  commentsUpdated() {
    this.fetchComments();
  }
  protected fetchComments() {
    if(!this.article) {
      return;
    }
    this.subscription = this.commentService.getArticleComments(this.article, this.limit)
      .subscribe(
      (data: HttpResponse<Comment[]>) => {
        const count = data.headers.get('X-Total-Count');
        if(count) {
          this.totalComments = +count;
        }
        if(!data.body) {
          return;
        }
        this.comments = data.body
        this.pageReady = true
      }
    )
  }

  increaseLimit() {
    this.limit = this.limit + 5;
    this.fetchComments()
  }
  delete(article: Article) {
    this.articleService.delete(article).subscribe(
      () => {
        this.router.navigate(['/'])
      }
    )
  }

  protected readonly Math = Math;
}
