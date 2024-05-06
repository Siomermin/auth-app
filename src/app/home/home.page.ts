import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
