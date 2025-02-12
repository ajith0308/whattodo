import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';
import { TaskCreationService } from './task-creation.service';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {

  currentTask?: Task;

  isFormCompleted: boolean = false;

  constructor(private taskService: TaskService, private route: Router, private task: TaskCreationService) { }

  ngOnInit() {
    this.createNewTask();
  }

  isCompleted() {
    if (this.currentTask!.content.length > 0 && this.currentTask?.category !== null) {
      this.isFormCompleted = true;
    } else {
      this.isFormCompleted = false;
    }
  }

  createNewTask() {
    this.currentTask = this.taskService.createNewTask();
  }

  updateTask(updatedTask: Task) {
    this.currentTask = updatedTask;
    this.isCompleted();
  }

  validateTask() {
    this.task.createData(this.currentTask!).subscribe((data: any) => {
      this.taskService.addToList(this.currentTask!);
    })
    this.route.navigate(["/Home"]);
  }

}
