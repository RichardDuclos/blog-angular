import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../../../models/article.model";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {ArticleService} from "../../../services/article/article.service";
import {Comment} from "../../../models/comment.model";

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent implements OnInit{
  @Input() article: Article | undefined;
  @Input() user: User | undefined;
  @Output() articleDeleted: EventEmitter<true> = new EventEmitter<true>();
  constructor( private router: Router, private articleService: ArticleService ) {
  }

  goToDetails(): void {
    if(!this.article) {
      return;
    }
    this.router.navigate([`articles/${this.article.id}`])
  }



  ngOnInit(): void {
    if(!this.user) {
      throw new Error('user must be included')
    }
  }
}
