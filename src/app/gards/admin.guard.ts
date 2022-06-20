import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    
    let role = this.auth.getRole();
    if (role == "ADMIN") {
      
      return true;
    }
    else {
      this.router.navigateByUrl('notauthorized');      
     
      return false;
    }
  }
  
  
}
