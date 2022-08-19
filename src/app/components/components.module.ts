import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ListComponent } from './list/list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListItemComponent } from './list-item/list-item.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    ListComponent,
    CalendarComponent,
    AddComponent,
    EditComponent,
    ListItemComponent,
    DatePickerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class ComponentsModule { }
