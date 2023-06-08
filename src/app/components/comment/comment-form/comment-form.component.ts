import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../models/comment.model";
import {SecurityService} from "../../../services/security/security.service";
import {CommentService} from "../../../services/comment/comment.service";
import {Article} from "../../../models/article.model";
import {User} from "../../../models/user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit{
  comment: Comment = {
    content: '',
  }
  @Input() article?: Article;
  @Input() user?: User;
  @Output() newCommentEvent: EventEmitter<true> = new EventEmitter<true>();
  constructor(private securityService: SecurityService, private commentService: CommentService) {
  }

  ngOnInit() {
    if(!this.user) {
      throw new Error('user must be declared')
    }
    if(!this.article) {
      throw new Error('article must be declared')
    }
    this.comment.user = this.user;
    this.comment.userId = this.user.id;
    this.comment.article = this.article;
    this.comment.articleId = this.article.id
  }

  onSubmit(form: NgForm): void {
    this.commentService.create(this.comment).subscribe(
      (comment: Comment) => {
        this.newCommentEvent.emit(true);
        this.comment.content = '';
        form.resetForm();
      }
    );
  }
}
