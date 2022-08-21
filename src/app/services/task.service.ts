import { Injectable } from '@angular/core';
import { TaskItem } from '../interfaces/task-item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  currentTask?: TaskItem;

  constructor() { }
}
