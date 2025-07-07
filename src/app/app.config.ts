import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp({ projectId: "angular-todo-8c720", appId: "1:69402408619:web:cd6cb634376d190bd029ee", storageBucket: "angular-todo-8c720.firebasestorage.app", apiKey: "AIzaSyB5J1lKDRncuwlIixQDYJyxKvuWqEjC6V0", authDomain: "angular-todo-8c720.firebaseapp.com", messagingSenderId: "69402408619" })), provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
