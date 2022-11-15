import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    SideNavComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    RouterModule
  ],
  exports: [SideNavComponent, SidenavComponent]
})
export class NavModule { }
