import { Component, OnInit } from '@angular/core';
import { ROUTES, ROUTES_EMPLOYEE } from '@shared/menuItems';
import { AuthService } from '@services/auth/auth.service';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    const role = this.authService.getItemToken('role');
    if (role == 'Admin') {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      return;
    } //TODO: Realizar barras laterales distintas para cada Rol
    if (role == 'Sistemas') {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      return;
    }
    if (role == 'Administracion') {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      return;
    }
    if (role == 'Empleado') {
      this.menuItems = ROUTES_EMPLOYEE.filter((menuItem) => menuItem);
    }
  }

  onSwipe(event: Event) {
    event.preventDefault();
    this.themeService.setSwipeBar(false);
  }
}
