import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import User from '@backend/models/user';
import { MeService } from '../me.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  // icons are now available inside the template
  faSignOutAlt = faSignOutAlt;

  // once initialized, you can use it to dynamically adapt the navigation template.
  me: User;

  constructor (
    private meService: MeService,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    // When the NavigationComponent is mounted, the MeService has already been resolved.
    this.me = activatedRoute.snapshot.data.me;
  }

  async logout () {
    await this.meService.logout();
    await this.router.navigateByUrl('/login');
  }
}
