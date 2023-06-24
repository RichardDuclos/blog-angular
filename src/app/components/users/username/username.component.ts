import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit{
  @Input() user?: User;
  ngOnInit() {
    if(!this.user) {
      throw new Error('user must be declared')
    }
  }
}
