import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentleave } from '../_helpers/canComponentLeave';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<CanComponentleave> {
  canDeactivate(component: CanComponentleave):  boolean {
    return component.canLeave();
  }
  
}
