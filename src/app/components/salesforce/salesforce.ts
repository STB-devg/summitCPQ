import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesforceService } from '../../services/salesforce';
import { Opportunity } from '../../models/salesforce';

@Component({
  selector: 'app-salesforce',
  imports: [CommonModule, FormsModule],
  templateUrl: './salesforce.html',
  styleUrl: './salesforce.scss',
})

export class SalesforceComponent {
  ownerId  = signal('');
  records  = signal<Opportunity[]>([]);
  loading  = signal(false);
  error    = signal<string | null>(null);

  constructor(private svc: SalesforceService) {}

  fetch() {
    if (!this.ownerId().trim()) return;

    this.loading.set(true);
    this.error.set(null);
    this.records.set([]);

    this.svc.getOpenOpportunities(this.ownerId()).subscribe({
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
