import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CitasSearchComponent } from '../components/citas-search.component';
import { CitasInsertComponent } from '../components/citas-insert.component';

@Component({
  selector: 'app-citas-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    CitasSearchComponent,
    CitasInsertComponent
  ],
  template: `
    <mat-toolbar color="primary" class="main-toolbar">
      <span class="title">ReservasApp - Mantenimiento Vehicular</span>
    </mat-toolbar>

    <div class="container">
      <div class="main-grid">
        <app-citas-search></app-citas-search>
        <app-citas-insert></app-citas-insert>
      </div>
    </div>
  `,
  styleUrl: './citas-page.component.css'
})
export class CitasPageComponent {}
