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
}
