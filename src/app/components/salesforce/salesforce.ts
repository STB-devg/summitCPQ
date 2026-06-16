import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SalesforceService } from '../../services/salesforce';
import { AuthService } from '../../services/auth.service';
import { Opportunity } from '../../models/salesforce';
import { NavMenuComponent } from '../nav-menu/nav-menu';

@Component({
  selector: 'app-salesforce',
  imports: [ReactiveFormsModule, CurrencyPipe, NavMenuComponent],
  templateUrl: './salesforce.html',
  styleUrl: './salesforce.scss'
})
export class SalesforceComponent {
  private svc = inject(SalesforceService);
  auth        = inject(AuthService);

  ownerIdControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^005[a-zA-Z0-9]{15}$/)
  ]);

  records = signal<Opportunity[]>([]);
  loading = signal(false);
  error   = signal<string | null>(null);

  fetch() {
    if (this.ownerIdControl.invalid) return;

    this.loading.set(true);
    this.error.set(null);
    this.records.set([]);

    this.svc.getOpenOpportunities(this.ownerIdControl.value!).subscribe({
      next: data => {
        this.records.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
