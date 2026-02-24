import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { CitaService } from '../services/cita.service';
import { CitaCreateDto, Cita } from '../models/cita.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-citas-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './citas-insert.component.html',
  styleUrl: './citas-insert.component.css'
})
export class CitasInsertComponent {
  bookingForm: FormGroup;
  loading: boolean = false;
  minDate: Date = new Date();
  availableHours: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6 && (d ? d >= today : false);
  };

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onPlacaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 3) value = value.substring(0, 3) + '-' + value.substring(3, 7);
    input.value = value;
    this.bookingForm.patchValue({ placa: value }, { emitEvent: true });
  }

  onBook(): void {
    if (this.bookingForm.invalid) return;

    this.loading = true;
    const { placa, fecha, hora } = this.bookingForm.value;
    const d = new Date(fecha);
    const [hh, mm] = (hora as string).split(':');
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const localIsoString = `${year}-${month}-${day}T${hh}:${mm}:00`;

    const dto: CitaCreateDto = { 
      placa: (placa as string).trim(), 
      fechaHora: localIsoString 
    };

    this.citaService.create(dto)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: () => {
          this.snackBar.open('¡Cita agendada con éxito!', 'Cerrar', { duration: 4000 });
          // SE HA ELIMINADO EL NOTIFY PARA EVITAR BÚSQUEDA AUTOMÁTICA
          this.bookingForm.reset();
          Object.keys(this.bookingForm.controls).forEach(k => {
            this.bookingForm.get(k)?.setErrors(null);
          });
          this.cdr.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          const msg = err.error?.message || err.error?.Message || 'Error al agendar la cita.';
          this.snackBar.open(msg, 'Cerrar', { 
            duration: 6000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
}
