import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  // ✅ Register new user
  async register(email: string, password: string): Promise<UserCredential> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
  
      console.log("Registered:", result.user.uid);
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // ✅ Login user
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      console.log("Logged in:", result.user.uid);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // ✅ Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']); // or your landing page
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // ✅ Get current user
  get currentUser() {
    return this.auth.currentUser;
  }
}
