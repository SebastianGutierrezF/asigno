import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule
  ],
  exports: [SideNavComponent]
})
export class NavModule { }
