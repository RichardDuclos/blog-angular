import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {SecurityService} from "../../../services/security/security.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  currentUser?: User;
  user?: User;
  userSubsciption?: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private securityService: SecurityService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.currentUser = this.securityService.getLocalUser();
    if (!this.currentUser) {
      return this.securityService.logout();
    }
    this.userSubsciption = this.userService.get(id).subscribe(
      (user: User) => {
        this.user = user
      }
    )
  }

}
