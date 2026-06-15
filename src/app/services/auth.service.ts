import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

interface User {
  email?: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  currentUser = signal<User | null>(null);
  authStateChanged$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        this.currentUser.set({
          id: session.user.id,
          email: session.user.email
        });
      } else {
        this.currentUser.set(null);
      }
      this.authStateChanged$.next(this.isLoggedIn());
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (data.user) {
      this.currentUser.set({
        id: data.user.id,
        email: data.user.email
      });
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
