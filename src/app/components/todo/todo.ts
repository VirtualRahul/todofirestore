import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { TodoModel } from '../../models/todo.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-todo',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo implements OnInit {
  private todoService = inject(TodoService);
  private authService = inject(AuthService);
  // Define the form controls for creating and editing todos
  todoForm!: FormGroup;
  editTodoForm!: FormGroup;
  todoList$!: Observable<TodoModel[]>;
  selectedTodoId: string | null = null;
  userData = this.authService.currentUser;;

  ngOnInit(): void {
    this.initForm();   
    this.todoList$ = this.todoService.getItems();
    console.log('User Data:', this.userData);
  }

  initForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
    this.editTodoForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteItem(id).then(response => { })
  }

  openEditModal(item: TodoModel) {
    this.selectedTodoId = item.id;
    this.editTodoForm.patchValue({ title: item.title });
  }

  handleSubmit() {
    if (this.todoForm.valid) {
      this.todoService.createItem(this.todoForm.value).then(() => {
        this.todoForm.reset(); 
      }).catch((error) => {
        console.error('Error saving todo:', error);
      });
    }
  }

  handleUpdate() {
    if (this.selectedTodoId) {
      this.todoService.updateItem(this.selectedTodoId, this.editTodoForm.value).then(() => {
         this.selectedTodoId = null;
         this.editTodoForm.reset(); 
      }).catch((error) => {
        console.error('Error saving todo:', error);
      });
    }
  }
}

