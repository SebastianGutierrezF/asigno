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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TeamComponent } from './team/team.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
  declarations: [
    ListComponent,
    CalendarComponent,
    AddComponent,
    EditComponent,
    ListItemComponent,
    DatePickerComponent,
    LoginComponent,
    TeamComponent,
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class ComponentsModule { }
