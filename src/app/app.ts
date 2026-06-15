import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesforceComponent } from './components/salesforce/salesforce';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SalesforceComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SummitCPQ');
}
