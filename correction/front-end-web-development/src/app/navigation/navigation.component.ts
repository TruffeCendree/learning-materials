import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from '@backend/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  // once initialized, you can use it to dynamically adapt the navigation template.
  me: User;

  constructor (activatedRoute: ActivatedRoute) {
    // When the NavigationComponent is mounted, the MeService has already been resolved.
    this.me = activatedRoute.snapshot.data.me;
  }
}
