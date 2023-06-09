import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../models/comment.model";
import {SecurityService} from "../../../services/security/security.service";
import {User} from "../../../models/user.model";
import {CommentService} from "../../../services/comment/comment.service";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit{
  @Input() comment: Comment | undefined;
  user?: User;
  @Output() commentDeleted: EventEmitter<true> = new EventEmitter<true>();
  @Output() commentUpdated: EventEmitter<Comment> = new EventEmitter<Comment>();
  editingComment: boolean= false;
  editedComment?: Comment;

  constructor(private securityService: SecurityService, private commentService: CommentService) {
  }

  ngOnInit() {
    if(!this.comment) {
      throw new Error('comment must be initialized')
    }
    const user = this.securityService.getLocalUser();
    if(!user) {
      throw new Error('user must be logged in')
    }
    this.user = user;

  }
  delete(comment: Comment) {
    this.commentService.delete(comment).subscribe(
      () => {
        this.commentDeleted.emit(true)
      }
    )
  }

  toggleEditing(comment: Comment) {
    this.editingComment = !this.editingComment;
  }

  edit(comment: Comment) {
    this.comment = comment;
    this.editingComment = false;
    this.commentUpdated.emit(comment);
  }

  validate(comment: Comment) {
    if(this.comment === undefined || this.comment.validated === undefined) {
      return;
    }
    this.comment.validated = true;
    this.commentService.edit(this.comment).subscribe(
      (comment: Comment) => {
        this.comment = comment;
        this.commentUpdated.emit(comment);
      }
    )

  }
}
