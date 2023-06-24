import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {User} from "../models/user.model";

@Directive({
  selector: '[appUsername]'
})
export class UsernameDirective implements OnInit {
  @Input('appUsername') user: User | undefined;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if(this.user) {
      if(this.user.admin == true) {
        this.elementRef.nativeElement.style.color = 'red';
      }
      this.elementRef.nativeElement.style.cursor = 'pointer';
    }
  }

}
