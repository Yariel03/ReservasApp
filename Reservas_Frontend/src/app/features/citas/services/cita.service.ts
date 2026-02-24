import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cita, CitaCreateDto } from '../models/cita.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = `${environment.apiUrl}/citas`; 
  
  private appointmentCreatedSource = new Subject<string>();
  appointmentCreated$ = this.appointmentCreatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getByPlaca(placa: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/${placa}`);
  }

  create(cita: CitaCreateDto): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  notifyAppointmentCreated(placa: string) {
    this.appointmentCreatedSource.next(placa);
  }
}
