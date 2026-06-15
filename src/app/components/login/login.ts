import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error   = signal<string | null>(null);

  form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async login() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.signIn(
        this.form.value.email!,
        this.form.value.password!
      );
      this.router.navigate(['/opportunities']);
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}
