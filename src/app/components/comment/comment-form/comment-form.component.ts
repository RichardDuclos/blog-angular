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
  @Input() comment: Comment = {
    content: '',
    validated: false
  }
  @Input() article?: Article;
  @Input() user?: User;
  @Output() formSubmit: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input() type: string = 'create';
  constructor(private securityService: SecurityService, private commentService: CommentService) {
  }

  ngOnInit() {
    console.log(this.type)
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
    if(this.type === 'edit') {
      this.commentService.edit(this.comment).subscribe(
        (comment: Comment) => this.formSuccess(comment, form)
      );
    } else if(this.type === 'create') {
      this.commentService.create(this.comment).subscribe(
        (comment: Comment) => this.formSuccess(comment, form)
      );
    }
  }
  formSuccess(comment: Comment, form: NgForm) {
    this.formSubmit.emit(comment);
    if(this.type === 'create') {
      this.comment.content = '';
    }
    form.resetForm();
  }
}
