import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'users', component: TeamComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: TeamsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
