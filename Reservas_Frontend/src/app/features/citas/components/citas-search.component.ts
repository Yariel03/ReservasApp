import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CitaService } from '../services/cita.service';
import { Cita } from '../models/cita.model';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-citas-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './citas-search.component.html',
  styleUrl: './citas-search.component.css'
})
export class CitasSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  citas: Cita[] = [];
  loading: boolean = false;
  searched: boolean = false;
  currentPlaca: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.subscription = this.citaService.appointmentCreated$.subscribe((placa: string) => {
      if (this.currentPlaca === placa) {
        this.fetchData(placa);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onPlacaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 3) value = value.substring(0, 3) + '-' + value.substring(3, 7);
    input.value = value;
    this.searchForm.patchValue({ placa: value }, { emitEvent: false });
  }

  onSearch(): void {
    if (this.searchForm.invalid) return;
    const placa: string = this.searchForm.get('placa')?.value;
    this.fetchData(placa);
  }

  onClear(): void {
    this.searchForm.reset();
    this.citas = [];
    this.searched = false;
    this.currentPlaca = '';
    Object.keys(this.searchForm.controls).forEach(key => {
      const ctrl = this.searchForm.get(key);
      ctrl?.setErrors(null);
      ctrl?.markAsPristine();
      ctrl?.markAsUntouched();
    });
    this.cdr.detectChanges();
  }

  private fetchData(placa: string): void {
    this.loading = true;
    this.currentPlaca = placa;
    
    this.citaService.getByPlaca(placa)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (res: Cita[]) => {
          this.citas = [...res];
          this.searched = true;
          this.searchForm.get('placa')?.setValue('');
          this.searchForm.get('placa')?.setErrors(null);
          this.searchForm.get('placa')?.markAsPristine();
          this.searchForm.get('placa')?.markAsUntouched();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.citas = [];
          this.searched = true;
          this.snackBar.open('No se encontraron registros.', 'Cerrar', { duration: 4000 });
          this.searchForm.get('placa')?.setValue('');
          this.cdr.detectChanges();
        }
      });
  }
}
