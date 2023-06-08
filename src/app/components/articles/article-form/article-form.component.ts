import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, NgForm} from "@angular/forms";
import {Article} from "../../../models/article.model";
import {ArticleService} from "../../../services/article/article.service";
import {SecurityService} from "../../../services/security/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnDestroy{
  subscription?: Subscription;
  article: Article = {
    title : '',
    content : '',
  }
  constructor(private router: Router, private fb: FormBuilder,
              private articleService: ArticleService, private securityService: SecurityService) {
  }

  ngOnInit(): void {
      const user = this.securityService.getLocalUser();
      if(!user) {
        throw new Error('user must be logged in')
      }
      this.article.user = user;
      this.article.userId = user.id;
    }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(articleForm: NgForm) {
      this.articleService.create(this.article).subscribe(
        (article: Article) => {
          articleForm.resetForm();
          this.router.navigate(['/'])
        }
      )
  }
}
