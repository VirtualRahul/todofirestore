import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Todo } from './components/todo/todo';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'todo',
        component: Todo
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    }
];
